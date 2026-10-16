// File: frontend/src/services/websocket.ts

import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { HeadcountSummary } from '../types';

export type HeadcountCallback = (data: HeadcountSummary) => void;
export type ConnectionStatusCallback = (connected: boolean) => void;

class WebSocketService {
  private client: Client | null = null;
  private isConnected: boolean = false;
  private messageCallbacks: Set<HeadcountCallback> = new Set();
  private statusCallbacks: Set<ConnectionStatusCallback> = new Set();

  public connect(endpointUrl: string = ((import.meta as any).env?.VITE_WS_URL || 'http://localhost:8085/ws')) {
    if (this.client && this.client.active) {
      return;
    }

    this.client = new Client({
      // Use SockJS fallback
      webSocketFactory: () => new SockJS(endpointUrl) as any,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (_str: string) => {
        // debug logging
      },
      onConnect: () => {
        this.isConnected = true;
        this.notifyStatus(true);
        console.log('[STOMP] Connected to WebSocket broker at', endpointUrl);

        // Subscribe to live headcount topic
        this.client?.subscribe('/topic/headcount', (message: IMessage) => {
          try {
            const payload: HeadcountSummary = JSON.parse(message.body);
            this.notifyMessage(payload);
          } catch (err) {
            console.error('[STOMP] Failed to parse incoming /topic/headcount payload:', err);
          }
        });
      },
      onDisconnect: () => {
        this.isConnected = false;
        this.notifyStatus(false);
        console.warn('[STOMP] Disconnected from WebSocket broker');
      },
      onStompError: (frame) => {
        console.error('[STOMP] Broker error:', frame.headers['message'], frame.body);
        this.isConnected = false;
        this.notifyStatus(false);
      },
      onWebSocketClose: () => {
        this.isConnected = false;
        this.notifyStatus(false);
      }
    });

    this.client.activate();
  }

  public subscribeToHeadcount(callback: HeadcountCallback): () => void {
    this.messageCallbacks.add(callback);
    return () => {
      this.messageCallbacks.delete(callback);
    };
  }

  public subscribeConnectionStatus(callback: ConnectionStatusCallback): () => void {
    this.statusCallbacks.add(callback);
    callback(this.isConnected);
    return () => {
      this.statusCallbacks.delete(callback);
    };
  }

  private notifyMessage(data: HeadcountSummary) {
    this.messageCallbacks.forEach((cb) => {
      try {
        cb(data);
      } catch (e) {
        console.error('Error executing headcount callback:', e);
      }
    });
  }

  private notifyStatus(status: boolean) {
    this.statusCallbacks.forEach((cb) => {
      try {
        cb(status);
      } catch (e) {
        console.error('Error executing status callback:', e);
      }
    });
  }

  public disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      this.isConnected = false;
      this.notifyStatus(false);
    }
  }
}

export const wsService = new WebSocketService();

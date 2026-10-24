import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  type ScrollViewInstance,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { api } from '@/services/api';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  status?: 'sending' | 'failed';
};

type MetaChatBotProps = {
  token: string | null;
};

export default function MetaChatBot({ token }: MetaChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const sendingRef = useRef(false);
  const messageIdRef = useRef(0);
  const scrollRef = useRef<ScrollViewInstance | null>(null);

  const requestReply = async (content: string, id: string, isNewMessage: boolean) => {
    if (!token || sendingRef.current) return;

    sendingRef.current = true;
    setSending(true);
    setError('');
    if (isNewMessage) {
      setMessages((current) => [...current, { id, role: 'user', content, status: 'sending' }]);
    } else {
      setMessages((current) => current.map((item) => item.id === id ? { ...item, status: 'sending' } : item));
    }

    try {
      const reply = await api.chat(content, token);
      setMessages((current) => [
        ...current.map((item) => item.id === id ? { ...item, status: undefined } : item),
        { id: `assistant-${id}`, role: 'assistant', content: reply },
      ]);
    } catch (cause) {
      setMessages((current) => current.map((item) => item.id === id ? { ...item, status: 'failed' } : item));
      setError(cause instanceof Error ? cause.message : 'Could not send your message. Please try again.');
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  const sendMessage = () => {
    const content = message.trim();
    if (!content || !token || sendingRef.current) return;
    setMessage('');
    const id = `user-${messageIdRef.current++}`;
    void requestReply(content, id, true);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.messages, messages.length === 0 && styles.emptyMessages]}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>How can I help with your study journey?</Text>
            <Text style={styles.emptyCopy}>Ask about study pathways, bursaries, applications, or planning your student costs.</Text>
          </View>
        ) : messages.map((item) => {
          const isUser = item.role === 'user';
          return (
            <View key={item.id} style={[styles.messageRow, isUser ? styles.userRow : styles.assistantRow]}>
              <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
                <Text style={[styles.messageText, isUser ? styles.userText : styles.assistantText]}>{item.content}</Text>
                {item.status === 'sending' && <Text style={styles.messageStatus}>Sending…</Text>}
                {item.status === 'failed' && (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Retry sending message"
                    disabled={sending}
                    onPress={() => void requestReply(item.content, item.id, false)}
                    style={styles.retry}
                  >
                    <Text style={styles.retryText}>Could not send. Tap to retry.</Text>
                  </Pressable>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
      {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
      {!token && <Text accessibilityRole="alert" style={styles.error}>Sign in to send messages to the assistant.</Text>}
      <View style={styles.composer}>
        <TextInput
          accessibilityLabel="Message the study assistant"
          editable={Boolean(token) && !sending}
          multiline
          onChangeText={setMessage}
          placeholder="Ask a question..."
          placeholderTextColor="#89938B"
          style={styles.input}
          value={message}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send message"
          disabled={!message.trim() || !token || sending}
          onPress={sendMessage}
          style={({ pressed }) => [styles.send, (!message.trim() || !token || sending) && styles.sendDisabled, pressed && styles.pressed]}
        >
          {sending ? <ActivityIndicator color="#FFFFFF" size="small" /> : <Text style={styles.sendText}>↑</Text>}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  messages: { width: '100%', maxWidth: 680, alignSelf: 'center', padding: 18, paddingBottom: 12, flexGrow: 1 },
  emptyMessages: { justifyContent: 'center' },
  emptyState: { backgroundColor: '#E8F3ED', borderRadius: 17, padding: 18, marginTop: 10 },
  emptyTitle: { color: '#173B35', fontSize: 15, fontWeight: '600' },
  emptyCopy: { color: '#65746B', fontSize: 13, lineHeight: 20, marginTop: 7 },
  messageRow: { width: '100%', marginVertical: 5 },
  userRow: { alignItems: 'flex-end' },
  assistantRow: { alignItems: 'flex-start' },
  bubble: { maxWidth: '88%', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10 },
  userBubble: { backgroundColor: '#1F6758', borderBottomRightRadius: 5 },
  assistantBubble: { backgroundColor: '#E8F3ED', borderBottomLeftRadius: 5 },
  messageText: { fontSize: 14, lineHeight: 20 },
  userText: { color: '#FFFFFF' },
  assistantText: { color: '#173B35' },
  messageStatus: { color: '#D5E9DF', fontSize: 10, marginTop: 5 },
  retry: { marginTop: 6 },
  retryText: { color: '#A33D34', fontSize: 11, textDecorationLine: 'underline' },
  error: { color: '#A33D34', fontSize: 12, lineHeight: 17, paddingHorizontal: 18, paddingBottom: 6 },
  composer: { flexDirection: 'row', alignItems: 'flex-end', gap: 9, paddingHorizontal: 18, paddingVertical: 12, borderTopColor: '#E7EBE4', borderTopWidth: 1 },
  input: { flex: 1, minHeight: 45, maxHeight: 120, borderRadius: 14, borderColor: '#E7EBE4', borderWidth: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 13, paddingVertical: 11, fontSize: 14, color: '#173B35' },
  send: { height: 45, width: 45, borderRadius: 15, backgroundColor: '#1F6758', alignItems: 'center', justifyContent: 'center' },
  sendDisabled: { backgroundColor: '#BFCFC5' },
  sendText: { color: '#FFFFFF', fontSize: 22 },
  pressed: { opacity: 0.75 },
});

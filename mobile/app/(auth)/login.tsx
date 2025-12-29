import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    // TODO: Implement authentication logic
    console.log('Login attempt:', email);
    // Navigate to tabs after successful login
    router.replace('/(tabs)');
  };

  const handleRegister = () => {
    router.push('/(auth)/register');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
          <ThemedText style={styles.subtitle}>Sign in to continue</ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <TextInput
            style={[
              styles.input,
              { 
                color: Colors[colorScheme ?? 'light'].text,
                borderColor: Colors[colorScheme ?? 'light'].icon,
                backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
              }
            ]}
            placeholder="Email"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <ThemedView style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                styles.inputFlex,
                { 
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].icon,
                  backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                  paddingRight: 44,
                }
              ]}
              placeholder="Password"
              placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
            />

            {password.length > 0 && (
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.toggleButton}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={22}
                  color={Colors[colorScheme ?? 'light'].tint}
                />
              </TouchableOpacity>
            )}
          </ThemedView>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={handleLogin}
          >
            <ThemedText style={styles.buttonText}>Sign In</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRegister} style={styles.registerLink}>
            <ThemedText style={styles.linkText}>
              Don&apos;t have an account? <ThemedText style={[styles.linkTextBold, { color: Colors[colorScheme ?? 'light'].tint }]}>Sign Up</ThemedText>
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
    fontSize: 16,
  },
  form: {
    gap: 16,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputFlex: {
    flex: 1,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
  },
  toggleButton: {
    position: 'absolute',
    right: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  registerLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
  linkTextBold: {
    fontWeight: '600',
  },
});

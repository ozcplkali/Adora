import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleRegister = () => {
    // TODO: Implement registration logic
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    console.log('Register attempt:', { name, email });
    // Navigate to tabs after successful registration
    router.replace('/(tabs)');
  };

  const handleLogin = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.content}>
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
            <ThemedText style={styles.subtitle}>Sign up to get started</ThemedText>
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
              placeholder="Full Name"
              placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
            />

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
                placeholder="Confirm Password"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
                autoComplete="password"
              />

              {confirmPassword.length > 0 && (
                <TouchableOpacity
                  onPress={() => setShowConfirm((prev) => !prev)}
                  style={styles.toggleButton}
                  accessibilityRole="button"
                  accessibilityLabel={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                >
                  <Ionicons
                    name={showConfirm ? 'eye-off' : 'eye'}
                    size={22}
                    color={Colors[colorScheme ?? 'light'].tint}
                  />
                </TouchableOpacity>
              )}
            </ThemedView>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
              onPress={handleRegister}
            >
              <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin} style={styles.loginLink}>
              <ThemedText style={styles.linkText}>
                Already have an account? <ThemedText style={[styles.linkTextBold, { color: Colors[colorScheme ?? 'light'].tint }]}>Sign In</ThemedText>
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
  loginLink: {
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

import Ionicons from "@expo/vector-icons/Ionicons";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { styles } from "../../styles/LoginForm";

export default function LoginForm({
  theme,

  email,
  setEmail,

  password,
  setPassword,

  showPassword,
  onTogglePassword,

  remember,
  onToggleRemember,

  onSubmit,
  onRegister,
}) {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={[styles.header, { color: theme.text }]}>
        Welcome back
      </Text>
      <Text style={[styles.subheader, { color: theme.subtext }]}>
        Sign in to continue
      </Text>

      <Text style={[styles.label, { color: theme.subtext }]}>
        Email
      </Text>
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
        ]}
      >
        <Ionicons
          name="mail-outline"
          size={18}
          color={theme.subtext}
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={theme.subtext}
        />
      </View>

      <Text style={[styles.label, { color: theme.subtext }]}>
        Password
      </Text>
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
        ]}
      >
        <Ionicons
          name="lock-closed-outline"
          size={18}
          color={theme.subtext}
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={[styles.input, { color: theme.text, flex: 1 }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          placeholderTextColor={theme.subtext}
        />
        <TouchableOpacity onPress={onTogglePassword} hitSlop={8}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={18}
            color={theme.subtext}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.rememberRow}
        onPress={onToggleRemember}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: remember ? theme.primary : theme.border,
              backgroundColor: remember ? theme.primary : "transparent",
            },
          ]}
        >
          {remember && (
            <Ionicons name="checkmark" size={16} color="#fff" />
          )}
        </View>
        <Text style={{ color: theme.text, fontWeight: "600" }}>
          Remember me
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSubmit}
        style={[styles.button, { backgroundColor: theme.primary }]}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRegister}>
        <Text
          style={{
            marginTop: 15,
            color: theme.primary,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          You don't have an account? Register here.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

import Ionicons from "@expo/vector-icons/Ionicons";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { styles } from "../../styles/RegisterForm";

export default function RegisterForm({
  theme,

  email,
  setEmail,

  password,
  setPassword,

  showPassword,
  onTogglePassword,

  onSubmit,
  onLogin,
}) {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={[styles.header, { color: theme.text }]}>
        Create account
      </Text>
      <Text style={[styles.subheader, { color: theme.subtext }]}>
        Sign up to start writing
      </Text>

      <Text style={[styles.label, { color: theme.subtext }]}>
        Email
      </Text>
      <View
        style={[
          styles.inputRow,
          {
            borderColor: theme.border,
            backgroundColor: theme.surface,
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
          placeholderTextColor={theme.subtext}
          autoCapitalize="none"
        />
      </View>

      <Text style={[styles.label, { color: theme.subtext }]}>
        Password
      </Text>
      <View
        style={[
          styles.inputRow,
          {
            borderColor: theme.border,
            backgroundColor: theme.surface,
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
          placeholderTextColor={theme.subtext}
          autoCapitalize="none"
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
        onPress={onSubmit}
        style={[styles.button, { backgroundColor: theme.primary }]}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogin}>
        <Text
          style={{
            marginTop: 15,
            color: theme.primary,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          If you have an account? Login here.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

import Ionicons from "@expo/vector-icons/Ionicons";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import { styles } from "../../styles/LoginForm";

export default function LoginForm({
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
  const { theme } = useTheme();
  const lan = useLanguage();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={[styles.header, { color: theme.text }]}>
        {lan.LOGIN_TITLE}
      </Text>
      <Text style={[styles.subheader, { color: theme.subtext }]}>
        {lan.LOGIN_SUBTITLE}
      </Text>

      <Text style={[styles.label, { color: theme.subtext }]}>
        {lan.EMAIL}
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
          placeholder={lan.LOGIN_EMAIL_PLACEHOLDER}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={theme.subtext}
        />
      </View>

      <Text style={[styles.label, { color: theme.subtext }]}>
        {lan.PASSWORD}
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
          placeholder={lan.LOGIN_PASSWORD_PLACEHOLDER}
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
          {lan.LOGIN_REMEMBER_ME}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSubmit}
        style={[styles.button, { backgroundColor: theme.primary }]}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>{lan.LOGIN_SUBMIT}</Text>
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
          {lan.LOGIN_TO_REGISTER}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
import { styles } from "../../styles/RegisterForm";

export default function RegisterForm({
  email,
  setEmail,

  password,
  setPassword,

  showPassword,
  onTogglePassword,

  onSubmit,
  onLogin,
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
        {lan.REGISTER_TITLE}
      </Text>
      <Text style={[styles.subheader, { color: theme.subtext }]}>
        {lan.REGISTER_SUBTITLE}
      </Text>

      <Text style={[styles.label, { color: theme.subtext }]}>
        {lan.EMAIL}
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
          placeholder={lan.REGISTER_EMAIL_PLACEHOLDER}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={theme.subtext}
          autoCapitalize="none"
        />
      </View>

      <Text style={[styles.label, { color: theme.subtext }]}>
        {lan.PASSWORD}
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
          placeholder={lan.REGISTER_PASSWORD_PLACEHOLDER}
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
        <Text style={styles.buttonText}>{lan.REGISTER_SUBMIT}</Text>
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
          {lan.REGISTER_TO_LOGIN}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

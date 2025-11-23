import {
  StyleSheet,
  TextInput,
  useColorScheme,
  type TextInputProps,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export type ThemedTextProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "search";
  size?: "small" | "medium" | "large";
  variant?: "outlined" | "filled" | "underlined";
  label?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  value,
  type = "default",
  size = "medium",
  variant = "outlined",
  label,
  error,
  success = false,
  leftIcon,
  rightIcon,
  secureTextEntry,
  ...rest
}: ThemedTextProps) {
  const theme = useColorScheme() ?? "light";
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getBackgroundColor = () => {
    if (variant === "filled") {
      return theme === "light" ? "#f5f5f5" : "#2a2a2a";
    }
    return "transparent";
  };

  const getBorderColor = () => {
    if (error) return "#ff3b30";
    if (success) return "#34c759";
    if (isFocused) return theme === "light" ? "#007AFF" : "#0A84FF";

    return theme === "light" ? "#c7c7cc" : "#48484a";
  };

  const getTextColor = () => {
    return theme === "light" ? "#000000" : "#ffffff";
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return styles.small;
      case "large":
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "filled":
        return styles.filled;
      case "underlined":
        return styles.underlined;
      default:
        return styles.outlined;
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case "title":
        return styles.title;
      case "subtitle":
        return styles.subtitle;
      case "link":
        return styles.link;
      case "search":
        return styles.search;
      case "defaultSemiBold":
        return styles.defaultSemiBold;
      default:
        return styles.default;
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: getTextColor(),
            },
            error && styles.labelError,
          ]}
        >
          {label}
        </Text>
      )}

      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          {...rest}
          value={value}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          style={[
            styles.base,
            getSizeStyles(),
            getVariantStyles(),
            getTypeStyles(),
            {
              backgroundColor: getBackgroundColor(),
              borderColor: getBorderColor(),
              color: getTextColor(),
              paddingLeft: leftIcon ? 40 : 12,
              paddingRight: rightIcon || (secureTextEntry && value) ? 40 : 12,
            },
            style,
          ]}
          placeholderTextColor={theme === "light" ? "#8e8e93" : "#ebebf599"}
          cursorColor={theme === "light" ? "#007AFF" : "#0A84FF"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <View style={styles.rightIcons}>
          {secureTextEntry && value && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconButton}
            >
              <Text style={[styles.iconText, { color: getTextColor() }]}>
                {isPasswordVisible ? "👁️" : "👁️‍🗨️"}
              </Text>
            </TouchableOpacity>
          )}

          {rightIcon && !(secureTextEntry && value) && (
            <View style={styles.rightIcon}>{rightIcon}</View>
          )}
        </View>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    position: "relative",
  },
  base: {
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  // Size variants
  small: {
    height: 36,
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  medium: {
    height: 44,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  large: {
    height: 52,
    fontSize: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  outlined: {
    borderWidth: 1,
  },
  filled: {
    borderWidth: 0,
  },
  underlined: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  default: {
    fontFamily: "System",
    fontWeight: "400",
  },
  defaultSemiBold: {
    fontFamily: "System",
    fontWeight: "600",
  },
  title: {
    fontFamily: "System",
    fontWeight: "700",
    fontSize: 24,
  },
  subtitle: {
    fontFamily: "System",
    fontWeight: "500",
    fontSize: 18,
  },
  link: {
    fontFamily: "System",
    fontWeight: "400",
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  search: {
    fontFamily: "System",
    fontWeight: "400",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  labelError: {
    color: "#ff3b30",
  },
  leftIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  rightIcons: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  rightIcon: {
    marginLeft: 8,
  },
  iconButton: {
    padding: 4,
  },
  iconText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: "#ff3b30",
    marginTop: 4,
    marginLeft: 4,
  },
});

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  useColorScheme,
  type TouchableOpacityProps,
  TextStyle,
  View,
} from "react-native";

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "primary" | "secondary" | "outline" | "danger" | "success" | "link";
  size?: "small" | "medium" | "large";
  shape?: "rectangle" | "rounded" | "pill";
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  textStyle?: TextStyle;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = "primary",
  size = "medium",
  shape = "rounded",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  textStyle,
  children,
  ...rest
}: ThemedButtonProps) {
  const theme = useColorScheme() ?? "light";

  const getBackgroundColor = () => {
    if (disabled) return theme === "light" ? "#c7c7cc" : "#48484a";

    switch (type) {
      case "primary":
        return theme === "light" ? "#007AFF" : "#0A84FF";
      case "secondary":
        return theme === "light" ? "#f2f2f7" : "#3a3a3c";
      case "danger":
        return "#ff3b30";
      case "success":
        return "#34c759";
      case "outline":
      case "link":
        return "transparent";
      default:
        return theme === "light" ? "#007AFF" : "#0A84FF";
    }
  };

  const getTextColor = () => {
    if (disabled) return theme === "light" ? "#8e8e93" : "#ebebf599";

    switch (type) {
      case "primary":
      case "danger":
      case "success":
        return "#ffffff";
      case "secondary":
        return theme === "light" ? "#000000" : "#ffffff";
      case "outline":
      case "link":
        return theme === "light" ? "#007AFF" : "#0A84FF";
      default:
        return "#ffffff";
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme === "light" ? "#c7c7cc" : "#48484a";

    switch (type) {
      case "outline":
        return theme === "light" ? "#007AFF" : "#0A84FF";
      case "secondary":
        return theme === "light" ? "#c7c7cc" : "#48484a";
      case "danger":
        return "#ff3b30";
      case "success":
        return "#34c759";
      case "link":
      case "primary":
      default:
        return "transparent";
    }
  };

  const getBorderWidth = () => {
    return type === "outline" || type === "secondary" ? 1 : 0;
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

  const getShapeStyles = () => {
    switch (shape) {
      case "pill":
        return styles.pill;
      case "rectangle":
        return styles.rectangle;
      default:
        return styles.rounded;
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case "link":
        return styles.link;
      default:
        return styles.default;
    }
  };

  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.base,
        getSizeStyles(),
        getShapeStyles(),
        getTypeStyles(),
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: getBorderWidth(),
          width: fullWidth ? "100%" : "auto",
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getTextColor()}
          style={styles.loader}
        />
      ) : (
        <>
          {leftIcon && (
            <View style={[styles.icon, styles.leftIcon]}>{leftIcon}</View>
          )}

          <Text
            style={[
              styles.text,
              getSizeStyles(),
              {
                color: getTextColor(),
              },
              type === "link" && styles.linkText,
              textStyle,
            ]}
            numberOfLines={1}
          >
            {children}
          </Text>

          {rightIcon && (
            <View style={[styles.icon, styles.rightIcon]}>{rightIcon}</View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 32,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    minHeight: 44,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 52,
    fontSize: 16,
  },
  rectangle: {
    borderRadius: 0,
  },
  rounded: {
    borderRadius: 8,
  },
  pill: {
    borderRadius: 50,
  },
  default: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  link: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  linkText: {
    textDecorationLine: "underline",
    fontWeight: "400",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  loader: {
    marginHorizontal: 8,
  },
});

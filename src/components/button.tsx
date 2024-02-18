import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} className="h-16 justify-center items-center w-full bg-primary rounded-2xl" {...props}>
      <Text className="relative top-0.5 text-md text-white font-semibold uppercase -tracking-tighter">{children}</Text>
    </TouchableOpacity>
  );
}

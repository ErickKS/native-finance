import { TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  children: React.ReactNode;
}

interface InputIconProps {
  children: React.ReactNode;
}

function Input({ children, ...props }: InputProps) {
  return (
    <View className="flex-row flex-grow items-center justify-center h-16 px-4 border border-dark rounded-xl space-x-4 mb-5">
      {children}

      <TextInput placeholderTextColor={"#222222"} className="relative top-0.5 flex-1 h-full text-base text-dark font-regular" {...props} />
    </View>
  );
}

function InputIcon({ children }: InputIconProps) {
  return children;
}

Input.Icon = InputIcon;

export { Input };

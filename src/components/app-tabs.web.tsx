import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const green = '#1F6758';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton icon="⌂">Home</TabButton>
          </TabTrigger>
            
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton icon="👤">Profile</TabButton></TabTrigger>

          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton icon="✳">Support</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({
  children,
  isFocused,
  icon,
  onPress,
  onLongPress,
}: TabTriggerSlotProps & { icon: string }) {
  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}>
      <View style={[styles.tabIconWrap, isFocused && styles.tabIconWrapActive]}>
        <Text style={[styles.tabIcon, isFocused && styles.tabIconActive]}>{icon}</Text>
      </View>
      <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>{children}</Text>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <View style={styles.innerContainer}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    bottom: 13,
    width: '100%',
    paddingHorizontal: 18,
    alignItems: 'center',
    zIndex: 10,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 390,
    backgroundColor: '#FFFFFF',
    borderColor: '#E7EBE4',
    borderWidth: 1,
    borderRadius: 22,
    minHeight: 66,
    paddingVertical: 7,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    boxShadow: '0px 8px 24px rgba(23, 59, 53, 0.10)',
  },
  tabButton: {
    minWidth: 82,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 2,
  },
  tabIconWrap: {
    width: 37,
    height: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapActive: { backgroundColor: '#E8F3ED' },
  tabIcon: { color: '#839087', fontSize: 19, lineHeight: 23, fontWeight: '600' },
  tabIconActive: { color: green },
  tabLabel: { color: '#839087', fontSize: 9, fontWeight: '400' },
  tabLabelActive: { color: green, fontWeight: '600' },
  pressed: { opacity: 0.65 },
});

import { MoonIcon, SunIcon } from '@/shared/assets';
import { Button } from '@/shared/components';
import { useThemeStore } from '@/stores';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore();

  const icon = theme === 'dark' ? <MoonIcon /> : <SunIcon />;

  return <Button icon={icon} onClick={toggleTheme} />;
};

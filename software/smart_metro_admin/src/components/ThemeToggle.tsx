import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/store/themeStore';

export default function ThemeToggle() {
  const { theme, toggle } = useThemeStore();
  return (
    <Button variant="outline" size="sm" onClick={toggle} aria-label={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'} className="h-10 w-10 px-0">
      {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </Button>
  );
}

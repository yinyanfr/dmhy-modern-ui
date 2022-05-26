import { useMemo } from 'react';
/**
 * Modified from React-DarkReader
 * Original Author: Turkyden
 * https://github.com/Turkyden/react-darkreader
 */

import { useState, useEffect } from 'react';
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  // auto as followSystemColorScheme,
  exportGeneratedCSS as collectCSS,
  setFetchMethod,
} from '@umijs/ssr-darkreader';
import type { Theme, DynamicThemeFix } from '@umijs/ssr-darkreader';

export type Action = {
  toggle: () => void;
  collectCSS: () => Promise<string>;
};

export type Result = [boolean, Action];

export default function useDarkreader(
  defaultDarken = false,
  theme?: Partial<Theme>,
  fixes?: DynamicThemeFix,
): Result {
  const [isDark, setIsDark] = useState(defaultDarken);

  const defaultTheme = {
    brightness: 100,
    contrast: 90,
    sepia: 10,
  };

  const defaultFixes: DynamicThemeFix = {
    invert: [],
    css: '',
    ignoreInlineStyle: ['.react-switch-handle'],
    ignoreImageAnalysis: [],
    disableStyleSheetsProxy: false,
  };

  useEffect(() => {
    setFetchMethod(window.fetch);

    if (isDark) {
      enableDarkMode({ ...defaultTheme, ...theme }, { ...defaultFixes, ...fixes });
    } else {
      disableDarkMode();
    }

    // unmount
    return () => {
      disableDarkMode();
    };

    // TODO: followSystemColorScheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  const action = useMemo(() => {
    const toggle = () => setIsDark((prevState) => !prevState);

    return { toggle, collectCSS };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  return [isDark, action];
}

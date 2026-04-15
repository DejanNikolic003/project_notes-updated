import { useMemo } from "react";
import { useSelector } from "react-redux";
import { MESSAGES_STRINGS } from "../constants/uiStrings";

export function useLanguage() {
  const languageCode = useSelector((state) => state?.language?.code || "en");

  return useMemo(() => {
    return MESSAGES_STRINGS?.[languageCode] || MESSAGES_STRINGS?.en || {};
  }, [languageCode]);
}

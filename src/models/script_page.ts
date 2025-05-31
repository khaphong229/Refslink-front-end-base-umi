import { useState } from "react";
import { generateScript } from "@/services/FullPageScript";
import { GenerateScriptPayload } from "@/services/FullPageScript/typing";

export const useGenerateScriptModel = () => {
  const [type, setType] = useState<"include" | "exclude">("exclude");
  const [domains, setDomains] = useState<string>("example.com");
  const [advert, setAdvert] = useState<number>(2);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const payload: GenerateScriptPayload = {
      type,
      domains: domains.split(",").map((d) => d.trim()),
      advert,
    };

    try {
      setLoading(true);
      const response = await generateScript(payload);
      console.log("Generated script:", response.data);
      setResult(response.data);
    } catch (err) {
      console.error("Failed to generate script", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    type,
    setType,
    domains,
    setDomains,
    advert,
    setAdvert,
    handleSubmit,
    result,
    loading,
  };
};

import axios from "axios";

export interface TagDescription {
  title: string;
  description: string;
}

export const fetchTagDescriptions = async (): Promise<Record<string, TagDescription>> => {
  const { data } = await axios.get("http://localhost:8000/reactions/tags");
  return data;
};

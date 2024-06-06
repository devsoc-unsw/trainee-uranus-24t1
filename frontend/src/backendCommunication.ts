import axios from "axios";
import {
  AVATAR_PATH,
  FROM_ID_PATH,
  LOCAL_HOST,
  MATCHES_PATH,
  MESSAGES_PATH,
  SELF_PATH,
  START_CONVERSATION_PATH,
  STATIC_DATA_PATH,
  USERS_PATH,
} from "./utils/constants";

export const getStaticData = async (token: string | null) => {
  return (
    await axios.get(`${LOCAL_HOST}${STATIC_DATA_PATH}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};

export const getSelfData = async (token: string | null) => {
  return (
    await axios.get(`${LOCAL_HOST}${SELF_PATH}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};

export const putSelfData = async (token: string | null, data: unknown) => {
  await axios.put(`${LOCAL_HOST}${SELF_PATH}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const putSelfAvatar = async (token: string | null, file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(
    `${LOCAL_HOST}${SELF_PATH}${AVATAR_PATH}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export enum MessageType {
  Default,
  Seen,
}

export type Message = {
  _id: string;
  members: string[];
  sender: string;
  type: MessageType;
  content: string;
};

export const getSelfMessages = async (
  token: string | null
): Promise<Message[]> => {
  return (
    await axios.get(`${LOCAL_HOST}${SELF_PATH}${MESSAGES_PATH}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};

export type UserInfo = {
  firstName: string;
  lastName: string;
  courses: string[];
  futureCourses: string[];
  hobbies: string[];
  languages: string[];
  programmingLanguages: string[];
  pronouns: string[];
  age: number;
  wam: string;
  academicSocialRatio: number;
  avatarUrl: string;
  _id: string;
};

export const getUsersFromId = async (
  token: string | null,
  ids: (string | undefined)[]
): Promise<UserInfo[]> => {
  return (
    await axios.post(
      `${LOCAL_HOST}${USERS_PATH}${FROM_ID_PATH}`,
      { ids },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  ).data;
};

export const getSelfMatches = async (
  token: string | null
): Promise<UserInfo[]> => {
  return (
    await axios.get(`${LOCAL_HOST}${SELF_PATH}${MATCHES_PATH}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};

export const startConversation = async (
  token: string | null,
  id: string | undefined
) => {
  await axios.post(
    `${LOCAL_HOST}${USERS_PATH}${id}/${START_CONVERSATION_PATH}`,
    undefined,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

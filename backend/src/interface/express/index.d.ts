import express from "express";

interface UserInfoProps {
  email: string;
  role: string;
  id: string;
}

declare global {
  namespace Express {
    export interface Request {
      userInfo?: UserInfoProps;
    }
  }
}

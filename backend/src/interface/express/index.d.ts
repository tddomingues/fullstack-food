import express from "express";

interface UserInfoProps {
  email: string;
  role: string;
}

declare global {
  namespace Express {
    export interface Request {
      userInfo?: UserInfoProps;
    }
  }
}

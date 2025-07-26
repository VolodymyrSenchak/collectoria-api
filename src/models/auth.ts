import {Session, User} from "@supabase/supabase-js";

export interface LoginCommand {
  email: string;
  password: string;
}

export interface GoogleLoginCommand {
  credential: string;
}

export interface RegisterCommand extends LoginCommand {
  data: any;
  emailRedirectTo?: string;
}

export interface PasswordChangeCommand {
  email: string;
  password: string;
}

export interface PasswordResetCommand {
  email: string;
  redirectTo: string;
}

export interface AuthResult {
  user: User;
  session: Session;
}

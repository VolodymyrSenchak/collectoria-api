import {getSupabaseClient} from "../utils/supabaseDb";
import {failure, Result, success} from "../models";
import {Session, User} from "@supabase/supabase-js";

export interface LoginCommand {
  email: string;
  password: string;
}

export interface PasswordChangeCommand {
  email: string;
  password: string;
  token: string;
}

export interface PasswordResetCommand {
  email: string;
  redirectTo: string;
}

export interface AuthResult {
  user: User;
  session: Session;
}

export class AuthService {
  private readonly db = getSupabaseClient();

  async register(command: LoginCommand): Promise<Result<AuthResult>> {
    const { data, error } = await this.db.auth.signUp({
      email: command.email,
      password: command.password,
    });

    return error ? failure(error) : success(data);
  }

  async login(command: LoginCommand): Promise<Result<AuthResult>> {
    const { data, error } = await this.db.auth.signInWithPassword({
      email: command.email,
      password: command.password,
    });

    return error ? failure(error) : success(data);
  }

  async refreshToken(refreshToken: string): Promise<Result<AuthResult>> {
    const { data, error } = await this.db.auth.refreshSession({
      refresh_token: refreshToken
    });

    return error ? failure(error) : success(data);
  }

  async getUser(jwt: string): Promise<Result<User>> {
    const { data, error } = await this.db.auth.getUser(jwt);

    return error ? failure(error) : success(data.user);
  }

  async resetPassword(command: PasswordResetCommand): Promise<Result<{}>> {
    const { error, data } = await this.db.auth.resetPasswordForEmail(command.email, { redirectTo: command.redirectTo });
    return error ? failure(error) : success(data);
  }

  async changePassword(command: PasswordChangeCommand): Promise<Result<{}>> {
    const { error, data } = await this.db.auth.updateUser({
      password: command.password
    });

    return error ? failure(error) : success(data);
  }
}

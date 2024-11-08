import SERVER_BASE_URL from "@/config/config";

const BASE_URL = `${SERVER_BASE_URL}/api`;

export const BACKEND_URL = SERVER_BASE_URL;

export const USERS = BASE_URL + "/users/";
export const MEMBERS = BASE_URL + "/members/";
export const ADMINISTRATEURS = BASE_URL + "/administrators/";

export const SAVINGS = BASE_URL + "/savings/";
export const EMPRUNTS = BASE_URL + "/borrowings/";
export const BORROWING_SAVINGS = BASE_URL + "/borrowing_savings/";
export const CONTRIBUTIONS = BASE_URL + "/contributions/";
export const REFUNDS = BASE_URL + "/refunds/";
export const OBLIGATORY_CONTRIBUTIONS = BASE_URL + "/obligatory_contributions/";

export const EXERCICES = BASE_URL + "/exercises/";
export const SESSIONS_ = BASE_URL + "/sessions_/";
export const CLOSED_SESSION = BASE_URL + "/closeSession/"
export const SESSION_IS_CLOSED = BASE_URL + "/active_session/"

export const HELP_TYPES = BASE_URL + "/help_types/";
export const HELPS = BASE_URL + "/helps/";

export const CONFIGURATIONS = BASE_URL + "/configs/";
export const ASK_BORROWINGS_HELPS = BASE_URL + "/ask_Borrowings_Helps/";
export const TRESOR = BASE_URL + "/tresorerie/";
export const FONDSOCIAL = BASE_URL + "/fond_social/"

export default {
  BASE_URL,
  BACKEND_URL,
  USERS,
  MEMBERS,
  ADMINISTRATEURS,
  SAVINGS,
  EMPRUNTS,
  BORROWING_SAVINGS,
  CONTRIBUTIONS,
  REFUNDS,
  OBLIGATORY_CONTRIBUTIONS,
  EXERCICES,
  SESSIONS_,
  HELP_TYPES,
  HELPS,
  CONFIGURATIONS,
  ASK_BORROWINGS_HELPS,
  TRESOR,
  FONDSOCIAL,
  SESSION_IS_CLOSED,
};
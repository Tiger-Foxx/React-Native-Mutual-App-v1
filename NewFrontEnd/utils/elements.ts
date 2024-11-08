// members.models.ts
interface Member {
  id: number;
  user_id: number;
  username: string;
  active: number;
  social_crown: number;
  inscription: number;
  administrator_id: number;
}

// sessions_.models.ts
interface Session {
  id: number;
  exercise_id: number;
  date: string;
  administrator_id: number;
  state: string;
  active: number;
  create_at: string;
}

// borrowings.models.ts
interface Borrowing {
  id: number;
  interest: number;
  amount_borrowed: number | null;
  amount_paid: number;
  amount_to_pay: number | null;
  payment_date_line: string | null;
  member_id: number;
  administrator_id: number;
  session_id: number;
  state: number;
  create_at: string;
}

// savings.models.ts
interface Saving {
  id: number;
  member_id: number;
  administrator_id: number;
  amount: number;
  session_id: number;
  create_at: string;
}

// contributions.models.ts
interface Contribution {
  id: number;
  member_id: number;
  date: string;
  state: number;
  created_at: string;
  help_id: number;
  administrator_id: number;
}

// helps.models.ts
interface Help {
  id: number;
  title: string;
  amount: number;
  active: number;
}

// administrators.models.ts
interface Administrator {
  id: number;
}

// exercises.models.ts
interface Exercise {
  id: number;
  year: number;
  active: number;
  administrator_id: number;
  create_at: string;
}

// users.models.ts
interface User {
  id: number;
  name: string;
  first_name: string;
  type: string;
  sex: string;
  email: string;
  avatar: string;
  tel: string;
  address: string;
  create_at: string;
}

export { Member, Session, Borrowing, Saving, Contribution, Help, Administrator, Exercise, User };
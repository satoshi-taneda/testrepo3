import "dotenv/config"; // .env.localの環境変数を読み込む
import fetch from "node-fetch"; // Node.jsでfetchを使うために必要

const fetchAllUsers = async () => {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable`;

  console.log("リクエストURL:", url); // **ここでURLが正しいか確認**

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json"
    }
  });

  if(!response.ok) {
    throw new Error(`HTTPエラー！ステータス: ${response.status}`);
  }

  const data = await response.json();
  console.log("①取得したユーザ一覧:", data);
};

// **ここで関数を実行する！**
fetchAllUsers();

const fetchSelectColumns = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?select=id, username`, {
    method: "GET",
    headers: {
      "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json"
    }
  });

  if(!response.ok) {
    throw new Error(`HTTPエラー！ステータス: ${response.status}`);
  }

  const data = await response.json();
  console.log("②選択したカラムのみ:", data);
};

// **ここで関数を実行する！**
fetchSelectColumns();

const fetchUserByName = async (username) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?username=eq.${username}&select=id, username`, {
    method: "GET",
    headers: {
      "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json"
    }
  });

  if(!response.ok) {
    throw new Error(`HTTPエラー！ステータス: ${response.status}`);
  }

  const data = await response.json();
  console.log(`③ユーザ名「${username}」のデータ`, data);
};

// **ここで関数を実行する！**
fetchUserByName("田中太郎");

const fetchSortedUsers = async (order = "desc") => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?select=id, username, created_at&order=created_at.${order}`, {
    method: "GET",
    headers: {
      "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json"
    }
  });

  if(!response.ok) {
    throw new Error(`HTTPエラー！ステータス: ${response.status}`);
  }

  const data = await response.json();
  console.log(`④作成日時降順(${order})のユーザ一覧:`, data);
};

// **ここで関数を実行する！**
fetchSortedUsers("desc"); // 降順

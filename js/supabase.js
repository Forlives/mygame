const SUPABASE_URL = 'https://gmsyvqviujosogwnboae.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdtc3l2cXZpdWpvc29nd25ib2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNjQzNTksImV4cCI6MjA4OTc0MDM1OX0.S7SrokLrrs9AeE-nkqV-N86T586X-7aNku_8JpdJ1S0';

let supabase = null;
let currentUser = null;

function initSupabase() {
    if (typeof window.supabase === 'undefined') {
        console.warn('Supabase SDK not loaded, using offline mode');
        return false;
    }
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return true;
}

async function signUp(username, password) {
    if (!supabase) return { error: { message: '离线模式，无法注册' } };

    const email = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@bacteriagame.com`;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
    });

    if (error) return { error };

    currentUser = { id: data.user.id, username };

    await supabase.from('profiles').upsert({
        id: data.user.id,
        username,
        created_at: new Date().toISOString(),
    });

    return { data: currentUser };
}

async function signIn(username, password) {
    if (!supabase) return { error: { message: '离线模式，无法登录' } };

    const email = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@bacteriagame.com`;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return { error };

    currentUser = {
        id: data.user.id,
        username: data.user.user_metadata?.username || username,
    };

    return { data: currentUser };
}

async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    currentUser = null;
}

async function getSession() {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    if (data.session) {
        currentUser = {
            id: data.session.user.id,
            username: data.session.user.user_metadata?.username || 'Player',
        };
        return currentUser;
    }
    return null;
}

async function saveProgress(levelData) {
    if (!supabase || !currentUser) {
        try {
            localStorage.setItem('bacteria_war_progress', JSON.stringify(levelData));
        } catch {}
        return;
    }

    await supabase.from('game_progress').upsert({
        user_id: currentUser.id,
        level_data: levelData,
        updated_at: new Date().toISOString(),
    });

    try {
        localStorage.setItem('bacteria_war_progress', JSON.stringify(levelData));
    } catch {}
}

async function loadProgress() {
    if (!supabase || !currentUser) {
        try {
            const data = localStorage.getItem('bacteria_war_progress');
            return data ? JSON.parse(data) : {};
        } catch { return {}; }
    }

    const { data, error } = await supabase
        .from('game_progress')
        .select('level_data')
        .eq('user_id', currentUser.id)
        .single();

    if (data?.level_data) return data.level_data;

    try {
        const local = localStorage.getItem('bacteria_war_progress');
        return local ? JSON.parse(local) : {};
    } catch { return {}; }
}

async function saveScore(levelIndex, time, stars) {
    if (!supabase || !currentUser) return;

    await supabase.from('scores').insert({
        user_id: currentUser.id,
        username: currentUser.username,
        level_index: levelIndex,
        time_seconds: Math.floor(time),
        stars,
    });
}

async function getLeaderboard(levelIndex) {
    if (!supabase) return [];

    const { data } = await supabase
        .from('scores')
        .select('username, time_seconds, stars')
        .eq('level_index', levelIndex)
        .order('time_seconds', { ascending: true })
        .limit(10);

    return data || [];
}

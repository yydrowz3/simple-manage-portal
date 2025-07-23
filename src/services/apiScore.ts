import type { ScoreType } from "../types/typeScore.ts";
import { supabase } from "../utils/supabase.ts";

export async function getScoreListApi() {
    const { data, error } = await supabase.from("tb_score").select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function createScoreApi(newScore: ScoreType) {
    const { error } = await supabase.from("tb_score").insert([newScore]);
    // .select();
    if (error) {
        throw new Error(error.message);
    }
    // return data;
}

export async function getScoreByScoreIdApi(scoreId: number) {
    const { data, error } = await supabase
        .from("tb_score")
        .select()
        .eq("id", scoreId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function updateScoreApi({
    scoreId,
    newSocre,
}: {
    scoreId: number;
    newSocre: ScoreType;
}) {
    const { error } = await supabase
        .from("tb_score")
        .update(newSocre)
        .eq("id", scoreId);
    // .select();

    if (error) {
        throw new Error(error.message);
    }

    // return data;
}

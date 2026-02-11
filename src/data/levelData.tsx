import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Molecule {
    formula: string;
    property: {
        Name?: string;
        Description?: string;
        DescriptionAttribution?: string;
        DescriptionLicense?: string;
    };
}

export interface ReactionHint {
    reactants: string[];
    products: string[];
    reactionPath: string;
    reactionHintPath: string;
}

export interface ReactionLog {
    reactants: string[];
    products: string[];
    description: string;
    tags: string[];
    reactionPath: string;
    reactionHintPath: string;
}

export interface LevelData {
    points: number;
    time: number;
    victoryCondition: string[];
    hint: string;
    reactionHint: ReactionHint[];
    reactionLog: ReactionLog[];
    reactingElements: string[];
}

export const fetchCurrentLevel = async (): Promise<LevelData | null> => {
    try {
        const { data } = await axios.get("http://localhost:8000/level/current");
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const fetchMolecules = async (): Promise<Molecule[]> => {
    const { data } = await axios.get("http://localhost:8000/molecule");
    return data;
};

export const usePenaltyMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { data } = await axios.post("http://localhost:8000/level/hint_used");
            return data;
        },
        onSuccess: () => {
            // Invalidate currentLevel to update points immediately
            queryClient.invalidateQueries({ queryKey: ["currentLevel"] });
        },
    });
};

import { listCategories } from "@/app/auth/categories/actions";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: listCategories,
    });
}

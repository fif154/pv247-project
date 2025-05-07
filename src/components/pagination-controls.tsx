import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";

type PaginationControlsProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const PaginationControls = ({
    page,
    totalPages,
    onPageChange,
}: PaginationControlsProps) => {
    if (totalPages <= 1) return null;

    const getPaginationItems = () => {
        if (totalPages < 1) return [];

        const firstPage = 1;
        const lastPage = totalPages;
        const pagesSet = new Set<number>();

        pagesSet.add(firstPage);
        pagesSet.add(lastPage);

        if (page - 1 > firstPage) {
            pagesSet.add(page - 1);
        }

        pagesSet.add(page);

        if (page + 1 < lastPage) {
            pagesSet.add(page + 1);
        }

        const sortedPages = Array.from(pagesSet).sort((a, b) => a - b);
        const items: (number | "ellipsis")[] = [];

        sortedPages.forEach((page, index) => {
            if (index > 0 && page - sortedPages[index - 1] > 1) {
                items.push("ellipsis");
            }
            items.push(page);
        });

        return items;
    };

    return (
        <Pagination className="mt-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(page - 1, 1))}
                        aria-disabled={page === 1}
                        className={
                            page === 1 ? "pointer-events-none opacity-50" : ""
                        }
                    />
                </PaginationItem>

                {getPaginationItems().map((p, index) => (
                    <PaginationItem key={index} className="hidden sm:flex">
                        {p === "ellipsis" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                isActive={page === p}
                                onClick={() => onPageChange(p)}
                            >
                                {p}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            onPageChange(Math.min(page + 1, totalPages))
                        }
                        aria-disabled={page === totalPages}
                        className={
                            page === totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

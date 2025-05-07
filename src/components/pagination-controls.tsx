import {
    Pagination,
    PaginationContent,
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

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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

                {pages.map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            isActive={page === p}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </PaginationLink>
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

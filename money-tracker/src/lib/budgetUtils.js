export const getUsedPercent = (b) => {
    if (!b?.total || b.total <= 0) return 0
    return b.spent / b.total
}
export const formatAmount = (value) => {
        if (value == null) return '0.00'
        value = parseFloat(value).toFixed(2);
        const parts = value.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
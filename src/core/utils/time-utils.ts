export const formatDate = (date: string): string => {
   const dateFormatted = new Date(date);
   
   const year = dateFormatted.getUTCFullYear();
   const day = dateFormatted.getUTCDate() > 9 ? dateFormatted.getUTCDate() : `0${dateFormatted.getUTCDate()}`;
   const month = dateFormatted.getUTCMonth() + 1 > 9 ? dateFormatted.getUTCMonth() + 1 : `0${dateFormatted.getUTCMonth() + 1}`;

   return `${day}/${month}/${year}`;
};

export function formatToTime(ms: number) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const remS = s % 60;
    return `${m.toString().padStart(2, '0')}:${remS.toString().padStart(2, '0')}`;
}
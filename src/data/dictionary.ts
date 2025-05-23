
export interface DictionaryEntry {
  aramaic: string;
  hebrew: string;
  definition: string;
  examples?: string[];
}

export const dictionary: DictionaryEntry[] = [
  {
    aramaic: "אביי",
    hebrew: "אביי",
    definition: "שם של אמורא בבלי, מגדולי התלמוד",
    examples: [
      "אמר אביי: שמע מינה...",
      "אביי ורבא דאמרי תרוייהו..."
    ]
  },
  {
    aramaic: "אילימא",
    hebrew: "אם תאמר",
    definition: "ביטוי המשמש להעלאת אפשרות פירוש שתידחה מיד",
    examples: [
      "אילימא בכותל דידיה..."
    ]
  },
  {
    aramaic: "אמר מר",
    hebrew: "אמר האדון/החכם",
    definition: "ביטוי המשמש לציטוט דברי חכם שהוזכר קודם לכן",
    examples: [
      "אמר מר יהיב ליה דמי כולה..."
    ]
  },
  {
    aramaic: "אי בעית אימא",
    hebrew: "אם תרצה אומר",
    definition: "ביטוי המשמש להצעת תירוץ או הסבר נוסף",
    examples: [
      "אי בעית אימא קרא ואי בעית אימא סברא"
    ]
  },
  {
    aramaic: "איתיביה",
    hebrew: "הקשה לו",
    definition: "ביטוי המציין שאחד האמוראים הקשה קושיה על דברי חברו",
    examples: [
      "איתיביה רב חסדא לרב הונא..."
    ]
  },
  {
    aramaic: "דאי",
    hebrew: "שאם",
    definition: "תנאי היפותטי",
    examples: [
      "דאי לא תימא הכי..."
    ]
  },
  {
    aramaic: "הכא",
    hebrew: "כאן",
    definition: "מציין מקום או עניין נוכחי בדיון",
    examples: [
      "הכא במאי עסקינן..."
    ]
  },
  {
    aramaic: "היכי דמי",
    hebrew: "כיצד זה",
    definition: "ביטוי המשמש לשאלה על טיבו של מקרה מסוים",
    examples: [
      "היכי דמי אילימא..."
    ]
  },
  {
    aramaic: "התם",
    hebrew: "שם",
    definition: "מציין מקום או עניין אחר מזה שנידון כעת",
    examples: [
      "התם לאו בר דעת הוא..."
    ]
  },
  {
    aramaic: "לאו אדעתא דהכי",
    hebrew: "לא על דעת כך",
    definition: "לא התכוון לכך מלכתחילה",
    examples: [
      "אנן סהדי דלאו אדעתא דהכי אקני ליה"
    ]
  },
];

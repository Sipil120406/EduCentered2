"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowRight, BookOpen, Bot, CheckCircle2, ChevronRight, ClipboardCheck,
  ClipboardList, Download, File, FilePlus, FileSpreadsheet, FileText, FolderOpen,
  GraduationCap, LayoutDashboard, ListPlus, MessageSquare, MessagesSquare, Plus,
  Send, Sparkles, Star, UploadCloud, Users, ChartNoAxesCombined, BookMarked, Trash2,
  PenLine, Eye, CalendarDays, Brain, Layers, Save, CircleHelp
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type Role = "Guru" | "Siswa";
type Course = { name: string; code: string; students: number };
type Doc = { id: number; course: string; name: string; type: string; desc: string; date: string };
type Quiz = { id: number; title: string; course: string; type: string; count: number };
type Feedback = { id: number; className: string; semester: string; rating: number; comment: string };

const initialCourses: Course[] = [
  { name: "X AKL 1", code: "AKL-X1-26", students: 32 },
  { name: "X AKL 2", code: "AKL-X2-26", students: 30 },
  { name: "X AKL 3", code: "AKL-X3-26", students: 30 },
  { name: "X AKL 4", code: "AKL-X4-26", students: 31 },
  { name: "XI AKL 1", code: "AKL-XI1-26", students: 29 },
  { name: "XI AKL 2", code: "AKL-XI2-26", students: 31 },
  { name: "XI AKL 3", code: "AKL-XI3-26", students: 29 },
  { name: "XI AKL 4", code: "AKL-XI4-26", students: 30 },
  { name: "XII AKL 1", code: "AKL-XII1-26", students: 28 },
  { name: "XII AKL 2", code: "AKL-XII2-26", students: 30 },
  { name: "XII AKL 3", code: "AKL-XII3-26", students: 29 },
  { name: "XII AKL 4", code: "AKL-XII4-26", students: 30 },
];
const teacherMenu = [
  ["Dashboard", LayoutDashboard], ["Courses Class", BookOpen], ["Penyusun Quiz", ClipboardList],
  ["Hasil Belajar", ChartNoAxesCombined], ["Penyusunan RPP", FileText], ["Feedback Siswa", MessagesSquare],
] as const;
const studentMenu = [
  ["Dashboard", LayoutDashboard], ["My Courses", BookOpen], ["Quiz", ClipboardCheck],
  ["Konsultasi AI", Bot], ["Feedback", MessagesSquare],
] as const;
const classPerf = [
  { name: "X AKL 1", avg: 82 }, { name: "X AKL 2", avg: 76 }, { name: "X AKL 3", avg: 73 },
  { name: "X AKL 4", avg: 80 }, { name: "XI AKL 1", avg: 84 }, { name: "XI AKL 2", avg: 78 },
  { name: "XI AKL 3", avg: 71 }, { name: "XI AKL 4", avg: 79 }, { name: "XII AKL 1", avg: 88 },
  { name: "XII AKL 2", avg: 81 }, { name: "XII AKL 3", avg: 77 }, { name: "XII AKL 4", avg: 74 },
];

export default function Home() {
  const [role, setRole] = useState<Role>("Guru");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [page, setPage] = useState("Dashboard");
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [course, setCourse] = useState("X AKL 1");
  const [joined, setJoined] = useState<string[]>(["X AKL 1", "XI AKL 1"]);
  const [courseName, setCourseName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [docs, setDocs] = useState<Doc[]>([
    { id: 1, course: "X AKL 1", name: "RPP Persamaan Dasar Akuntansi.docx", type: "RPP / Modul ajar", desc: "RPP pertemuan 1", date: "22 Okt 2026" },
    { id: 2, course: "X AKL 1", name: "Materi Persamaan Dasar Akuntansi.pdf", type: "Materi pembelajaran", desc: "Ringkasan materi dan contoh soal", date: "22 Okt 2026" },
    { id: 3, course: "XI AKL 1", name: "Latihan Jurnal Penyesuaian.xlsx", type: "Lembar kerja", desc: "Latihan pencatatan jurnal penyesuaian", date: "21 Okt 2026" },
  ]);
  const [docName, setDocName] = useState("");
  const [docType, setDocType] = useState("Materi pembelajaran");
  const [docDesc, setDocDesc] = useState("");
  const [quizTitle, setQuizTitle] = useState("Kuis Persamaan Dasar Akuntansi");
  const [quizTopic, setQuizTopic] = useState("Persamaan dasar akuntansi");
  const [quizType, setQuizType] = useState("Pilihan ganda");
  const [quizCount, setQuizCount] = useState("10");
  const [quizMode, setQuizMode] = useState("AI");
  const [quizTarget, setQuizTarget] = useState("X AKL 1");
  const [manualQuestion, setManualQuestion] = useState("Transaksi pemilik menyetorkan modal tunai akan memengaruhi akun apa?");
  const [manualAnswer, setManualAnswer] = useState("Kas dan modal");
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    { id: 1, title: "Kuis Jurnal Umum", course: "X AKL 1", type: "Pilihan ganda", count: 10 },
    { id: 2, title: "Latihan Persamaan Akuntansi", course: "XI AKL 1", type: "Campuran", count: 15 },
  ]);
  const [rppStep, setRppStep] = useState(1);
  const [rppFormat, setRppFormat] = useState("Word");
  const [rpp, setRpp] = useState({
    teacher: "Nama Guru", school: "SMK Negeri", className: "X AKL 1", semester: "Semester 1 / 2026–2027",
    subject: "Dasar-Dasar Akuntansi", topic: "Persamaan Dasar Akuntansi", model: "Problem Based Learning (PBL)",
    objective: "Siswa mampu menjelaskan dan menganalisis persamaan dasar akuntansi.", time: "2 × 45 menit",
    references: "Buku Dasar-Dasar Akuntansi; modul ajar sekolah", assessment: "Tes tertulis, observasi, dan latihan kasus",
    media: "Papan tulis, presentasi, lembar kerja", extra: "",
  });
  const [customModel, setCustomModel] = useState("");
  const [rppSaved, setRppSaved] = useState(false);
  const [rppMsg, setRppMsg] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    { id: 1, className: "X AKL 1", semester: "Semester 1", rating: 5, comment: "Materi mudah dipahami dan contoh soal sangat membantu." },
    { id: 2, className: "X AKL 1", semester: "Semester 1", rating: 4, comment: "Pembelajaran baik, waktu latihan bisa ditambah." },
    { id: 3, className: "XI AKL 1", semester: "Semester 1", rating: 5, comment: "Penjelasan dan latihan sangat jelas." },
    { id: 4, className: "XI AKL 1", semester: "Semester 1", rating: 3, comment: "Saya membutuhkan lebih banyak contoh soal." },
  ]);
  const [feedbackRating, setFeedbackRating] = useState("5");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("Semua kelas");
  const [feedbackSemester, setFeedbackSemester] = useState("Semua semester");
  const [feedbackSearch, setFeedbackSearch] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [gradeTab, setGradeTab] = useState("Rekap Nilai");
  const [gradeStudent, setGradeStudent] = useState("Siswa Demo");
  const [gradeCourse, setGradeCourse] = useState("X AKL 1");
  const [gradeValue, setGradeValue] = useState("80");
  const [gradeMsg, setGradeMsg] = useState("");
  const [manualGrades, setManualGrades] = useState<{name:string; course:string; value:number}[]>([]);
  const [consultInput, setConsultInput] = useState("");
  const [chat, setChat] = useState([{ who: "AI Tutor", text: "Halo! Aku bisa membantumu memahami materi yang nilainya belum mencapai KKM 75. Mau mulai dari konsep, contoh soal, atau latihan?" }]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [quizMsg, setQuizMsg] = useState("");
  const [quizHistory, setQuizHistory] = useState([{ title: "Kuis Jurnal Umum", score: 85, date: "18 Okt 2026" }, { title: "Latihan Persamaan Akuntansi", score: 72, date: "12 Okt 2026" }]);
  const [courseTab, setCourseTab] = useState("Materi");
  const [courseSearch, setCourseSearch] = useState("");
  const [searchDoc, setSearchDoc] = useState("");
  const [searchQuiz, setSearchQuiz] = useState("");
  const [classNotes, setClassNotes] = useState("Ulangi materi sebelum kuis dan kumpulkan latihan tepat waktu.");
  const [notice, setNotice] = useState("");
  const [showAllClasses, setShowAllClasses] = useState(false);
  const [rppSavedDocs, setRppSavedDocs] = useState(false);
  const [rppSaving, setRppSaving] = useState(false);

  const filteredFeedback = useMemo(() => feedbacks.filter(f =>
    (feedbackClass === "Semua kelas" || f.className === feedbackClass) &&
    (feedbackSemester === "Semua semester" || f.semester === feedbackSemester) &&
    f.comment.toLowerCase().includes(feedbackSearch.toLowerCase())
  ), [feedbacks, feedbackClass, feedbackSemester, feedbackSearch]);
  const avgFeedback = filteredFeedback.length ? (filteredFeedback.reduce((a, f) => a + f.rating, 0) / filteredFeedback.length).toFixed(1) : "0.0";
  const rppText = `RENCANA PELAKSANAAN PEMBELAJARAN\\n\\nSatuan Pendidikan: ${rpp.school}\\nGuru: ${rpp.teacher}\\nKelas: ${rpp.className}\\nSemester/Tahun: ${rpp.semester}\\nMata Pelajaran: ${rpp.subject}\\nTopik: ${rpp.topic}\\nModel: ${rpp.model === "Kustom" ? customModel : rpp.model}\\nAlokasi Waktu: ${rpp.time}\\n\\nTujuan Pembelajaran:\\n${rpp.objective}\\n\\nKegiatan Pembelajaran:\\nPendahuluan: apersepsi dan tujuan.\\nInti: analisis kasus, diskusi, latihan, presentasi.\\nPenutup: refleksi dan kesimpulan.\\n\\nMedia: ${rpp.media}\\nReferensi: ${rpp.references}\\nAsesmen: ${rpp.assessment}\\nCatatan: ${rpp.extra}`;
  const docsForCourse = docs.filter(d => d.course === course && d.name.toLowerCase().includes(searchDoc.toLowerCase()));
  const nav = role === "Guru" ? teacherMenu : studentMenu;

  useEffect(() => { if (!courses.some(c => c.name === course)) setCourse(courses[0]?.name || "X AKL 1"); }, [courses, course]);

  function setRppField(key: keyof typeof rpp, value: string) { setRpp(prev => ({ ...prev, [key]: value })); }
  function createCourse() {
    if (!courseName.trim()) return setNotice("Masukkan nama kursus terlebih dahulu.");
    const name = courseName.trim();
    const code = "EC-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    setCourses(prev => [...prev, { name, code, students: 0 }]); setCourse(name); setCourseName(""); setNotice(`Kursus ${name} berhasil dibuat dengan kode ${code} (simulasi).`);
  }
  function addDocument() {
    if (!docName.trim()) return setNotice("Isi nama file terlebih dahulu.");
    setDocs(prev => [{ id: Date.now(), course, name: docName.trim(), type: docType, desc: docDesc.trim() || "Belum ada deskripsi", date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) }, ...prev]);
    setNotice(`Dokumen ditambahkan ke ${course} (metadata simulasi; file asli belum diunggah).`); setDocName(""); setDocDesc("");
  }
  function publishQuiz() {
    if (!quizTitle.trim()) return setQuizMsg("Judul kuis wajib diisi.");
    setQuizzes(prev => [{ id: Date.now(), title: quizTitle.trim(), course: quizTarget, type: quizType, count: Number(quizCount) }, ...prev]);
    setQuizMsg(`Kuis "${quizTitle}" diterbitkan ke ${quizTarget} pada simulasi.`);
  }
  function submitFeedback() {
    if (!feedbackText.trim()) return setFeedbackMsg("Tulis komentar atau saran sebelum mengirim.");
    setFeedbacks(prev => [{ id: Date.now(), className: course, semester: "Semester 1", rating: Number(feedbackRating), comment: feedbackText.trim() }, ...prev]);
    setFeedbackText(""); setFeedbackMsg("Feedback terkirim dan masuk ke rekap guru (simulasi).");
  }
  function saveGrade() {
    const value = Number(gradeValue);
    if (!gradeStudent.trim() || !Number.isFinite(value) || value < 0 || value > 100) return setGradeMsg("Isi nama dan nilai 0–100 yang valid.");
    setManualGrades(prev => [{ name: gradeStudent, course: gradeCourse, value }, ...prev]); setGradeMsg(`Nilai ${value} untuk ${gradeStudent} tercatat (simulasi).`);
  }
  async function askAI() {
    if (!consultInput.trim()) return;
    const question = consultInput.trim(); setChat(prev => [...prev, { who: "Kamu", text: question }]); setConsultInput("");
    try {
      const response = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ task: "consultation", prompt: question }) });
      const data = await response.json();
      setChat(prev => [...prev, { who: "AI Tutor", text: data.answer || data.error || "Endpoint AI belum dikonfigurasi. Ini demo: gunakan Aset = Liabilitas + Ekuitas sebagai titik awal, lalu cek perubahan akun dalam setiap transaksi." }]);
    } catch { setChat(prev => [...prev, { who: "AI Tutor", text: "Belum terhubung ke layanan AI. Untuk demo, mulai dengan konsep Aset = Liabilitas + Ekuitas." }]); }
  }
  async function copyRpp() {
    try { await navigator.clipboard.writeText(rppText); setRppMsg("Teks RPP disalin ke clipboard."); }
    catch { setRppMsg("Clipboard tidak tersedia di browser ini. Pilih dan salin teks RPP secara manual."); }
  }

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => <div className="field"><label>{label}</label>{children}</div>;
  const Heading = ({ title, desc }: { title: string; desc?: string }) => <div className="page-heading"><h2>{title}</h2>{desc && <p>{desc}</p>}</div>;
  const Card = ({ title, children, extra }: { title?: string; children: React.ReactNode; extra?: React.ReactNode }) => <section className="card">{(title || extra) && <div className="row between" style={{marginBottom:14}}>{title && <h3 style={{margin:0}}>{title}</h3>}{extra}</div>}{children}</section>;
  const Button = ({ children, onClick, primary = false, disabled = false, danger = false }: any) => <button className={`btn ${primary ? "primary" : ""} ${danger ? "danger" : ""}`} onClick={onClick} disabled={disabled}>{children}</button>;
  const Notice = ({ children, error = false, success = false }: any) => children ? <div className={`notice ${error ? "error" : success ? "success" : ""}`}>{children}</div> : null;
  const Stat = ({ icon: Icon, label, value, sub }: any) => <Card><div className="stat"><div className="stat-icon"><Icon size={21}/></div><div><div className="stat-label">{label}</div><div className="stat-value">{value}</div>{sub && <div className="small muted">{sub}</div>}</div></div></Card>;
  const Progress = ({ name, value, colorLow = false }: any) => <div className="bar-row"><div className="bar-head"><span>{name}</span><strong className={colorLow ? "low-text" : ""}>{value}</strong></div><div className="bar"><span className={colorLow ? "low" : ""} style={{width:`${value}%`}}/></div></div>;
  const Tabs = ({ items, value, onChange }: { items: string[]; value: string; onChange: (v:string)=>void }) => <div className="tabs">{items.map(i=><button key={i} className={`tab ${value===i?"active":""}`} onClick={()=>onChange(i)}>{i}</button>)}</div>;

  if (!isLoggedIn) {
    return <main className="login-page">
      <section className="login-card">
        <div className="login-brand-mark"><GraduationCap size={30}/></div>
        <p className="login-eyebrow">SMART LEARNING & ANALYTICS</p>
        <h1>Selamat datang di EduCentered</h1>
        <p className="login-description">Masuk untuk melanjutkan pembelajaran dan mengakses dashboard sesuai peranmu.</p>
        <form onSubmit={(event) => {
          event.preventDefault();
          const username = loginUsername.trim().toLowerCase();
          if (username === "guru" && loginPassword === "Guru123!") {
            setRole("Guru"); setPage("Dashboard"); setIsLoggedIn(true); setLoginError(""); setNotice("");
          } else if (username === "siswa" && loginPassword === "Siswa123!") {
            setRole("Siswa"); setPage("Dashboard"); setIsLoggedIn(true); setLoginError(""); setNotice("");
          } else {
            setLoginError("Username atau password tidak sesuai. Gunakan akun demo yang tersedia di bawah.");
          }
        }}>
          <div className="field"><label htmlFor="login-username">Username</label><input id="login-username" autoComplete="username" value={loginUsername} onChange={e=>{setLoginUsername(e.target.value);setLoginError("");}} placeholder="Masukkan username" required /></div>
          <div className="field"><label htmlFor="login-password">Password</label><input id="login-password" type="password" autoComplete="current-password" value={loginPassword} onChange={e=>{setLoginPassword(e.target.value);setLoginError("");}} placeholder="Masukkan password" required /></div>
          {loginError && <div className="notice error" role="alert">{loginError}</div>}
          <button className="btn primary login-submit" type="submit">Masuk ke EduCentered <ArrowRight size={16}/></button>
        </form>
        <div className="demo-accounts">
          <h2>Akun demo untuk mencoba</h2>
          <div className="demo-account"><div><strong>Guru</strong><span>Dashboard pengajar</span></div><button type="button" className="btn" onClick={()=>{setLoginUsername("guru");setLoginPassword("Guru123!");setLoginError("");}}>Isi akun guru</button><code>guru / Guru123!</code></div>
          <div className="demo-account"><div><strong>Siswa</strong><span>Dashboard pelajar</span></div><button type="button" className="btn" onClick={()=>{setLoginUsername("siswa");setLoginPassword("Siswa123!");setLoginError("");}}>Isi akun siswa</button><code>siswa / Siswa123!</code></div>
        </div>
        <p className="login-footnote">Versi demo: akun ini hanya untuk mencoba antarmuka. Login belum terhubung ke database atau sistem autentikasi produksi.</p>
      </section>
    </main>;
  }

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="brand-mark"><GraduationCap size={25}/></div><div><h1>EduCentered</h1><p>Smart Learning & Analytics Platform for SMK Akuntansi</p></div></div>
      <div className="logged-user"><span className="role-pill">{role}</span><span className="logged-username">{loginUsername}</span><button className="btn logout-btn" onClick={()=>{setIsLoggedIn(false);setLoginPassword("");setLoginError("");setPage("Dashboard");}}>Keluar</button></div>
    </header>
    <div className="layout">
      <aside className="sidebar"><div className="nav-label">MENU {role.toUpperCase()}</div>{nav.map(([label, Icon])=><button key={label} className={`nav-item ${page===label?"active":""}`} onClick={()=>{setPage(label);setNotice("");setQuizMsg("");setGradeMsg("");setFeedbackMsg("");}}><Icon size={18}/>{label}</button>)}<div className="footer">Prototype interaktif<br/>Data contoh / sementara</div></aside>
      <main className="main">
        {page==="Dashboard" && role==="Guru" && <>
          <Heading title="Dashboard Guru" desc="Ringkasan pembelajaran dan aktivitas kelas."/>
          <div className="grid grid-4" style={{marginBottom:18}}><Stat icon={Users} label="Total siswa" value="359" sub="12 kelas AKL"/><Stat icon={BookOpen} label="Kursus aktif" value={courses.length} sub="Kelas terdaftar"/><Stat icon={ClipboardCheck} label="Kuis terbit" value={quizzes.length} sub="Lintas kursus"/><Stat icon={Star} label="Rata-rata feedback" value={`${avgFeedback}/5`} sub={`${feedbacks.length} respons demo`}/></div>
          <div className="grid grid-2"><Card title="Performa kelas" extra={<Button onClick={()=>setPage("Hasil Belajar")}>Lihat rekap <ArrowRight size={14}/></Button>}><div style={{height:300}}><ResponsiveContainer width="100%" height="100%"><BarChart data={classPerf}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name" tick={{fontSize:10}}/><YAxis domain={[0,100]}/><Tooltip/><Bar dataKey="avg" name="Rata-rata nilai" fill="#3478c5" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></Card><Card title="Pintasan kerja"><div className="grid grid-2"><button className="item" onClick={()=>setPage("Penyusunan RPP")}><FilePlus/><div className="item-title">+ Buat RPP dengan AI</div><div className="item-meta">Susun, edit, preview, Word/PDF</div></button><button className="item" onClick={()=>setPage("Penyusun Quiz")}><ListPlus/><div className="item-title">+ Buat Quiz dengan AI</div><div className="item-meta">Buat soal dan terbitkan ke kursus</div></button><button className="item" onClick={()=>setPage("Courses Class")}><UploadCloud/><div className="item-title">Kelola materi</div><div className="item-meta">Upload dokumen dan RPP</div></button><button className="item" onClick={()=>setPage("Feedback Siswa")}><MessagesSquare/><div className="item-title">Rekap feedback</div><div className="item-meta">Rating dan komentar siswa</div></button></div></Card></div>
          <div style={{marginTop:18}}><Card title="Perhatian: kelas dengan rata-rata di bawah KKM"><div className="grid grid-3">{classPerf.filter(c=>c.avg<75).map(c=><div key={c.name} className="item"><div className="row between"><strong>{c.name}</strong><span className="badge bad">{c.avg}</span></div><div className="item-meta">Perlu tindak lanjut pembelajaran</div></div>)}</div></Card></div>
        </>}
        {page==="Dashboard" && role==="Siswa" && <>
          <Heading title="Dashboard Siswa" desc="Pantau nilai, kursus, dan perkembangan belajarmu."/>
          <div className="grid grid-3" style={{marginBottom:18}}><Stat icon={Activity} label="Rata-rata nilai" value="78,5" sub="Lintas semester"/><Stat icon={BookOpen} label="Kursus diikuti" value={joined.length} sub="Kelas aktif"/><Stat icon={ClipboardCheck} label="Riwayat kuis" value={quizHistory.length} sub="Hasil pengerjaan demo"/></div>
          <Card title="Rekap nilai per semester"><div className="grid grid-3">{[{name:"Semester 1",score:78},{name:"Semester 2",score:81},{name:"Semester 3",score:76}].map(s=><div key={s.name} className="item"><div className="row between"><strong>{s.name}</strong><span className={s.score<75?"low-text":""}>{s.score}</span></div><Progress name="Rata-rata" value={s.score} colorLow={s.score<75}/></div>)}</div></Card>
          <div style={{marginTop:18}}><Card title="Nilai terbaru"><div className="table-wrap"><table><thead><tr><th>Materi</th><th>Nilai</th><th>KKM</th><th>Tindak lanjut</th></tr></thead><tbody>{[{name:"Jurnal Umum",score:85},{name:"Persamaan Dasar Akuntansi",score:68},{name:"Jurnal Penyesuaian",score:72}].map(g=><tr key={g.name}><td>{g.name}</td><td className={g.score<75?"low-text":""}>{g.score}</td><td>75</td><td>{g.score<75?<Button primary onClick={()=>{setPage("Konsultasi AI");setConsultInput(`Bantu saya memperbaiki nilai ${g.name} yang masih ${g.score}`)}}>Konsultasi AI</Button>:<span className="badge good">Tercapai</span>}</td></tr>)}</tbody></table></div></Card></div>
          <div style={{marginTop:18}} className="actions"><Button primary onClick={()=>setPage("My Courses")}>Buka My Courses <ArrowRight size={15}/></Button><Button onClick={()=>setPage("Quiz")}>Lihat kuis tersedia</Button></div>
        </>}
        {page==="Courses Class" && role==="Guru" && <>
          <Heading title="Courses Class" desc="Kelola kursus, dokumen, materi, catatan kelas, dan kuis yang diterbitkan."/>
          <Card title="Buat kursus baru"><div className="grid grid-2"><Field label="Nama kursus"><input value={courseName} onChange={e=>setCourseName(e.target.value)} placeholder="Contoh: XII AKL 2"/></Field><div className="field"><label>&nbsp;</label><Button primary onClick={createCourse}><Plus size={15}/> Buat kursus</Button></div></div><Notice>{notice}</Notice></Card>
          <div className="grid grid-2" style={{marginTop:18}}><Card title="Daftar kursus"><Field label="Cari kelas"><input value={courseSearch} onChange={e=>setCourseSearch(e.target.value)} placeholder="Cari kelas..."/></Field><div style={{maxHeight:460,overflowY:"auto"}}>{courses.filter(c=>c.name.toLowerCase().includes(courseSearch.toLowerCase())).map(c=><button key={c.name} className="item" style={{width:"100%",textAlign:"left",background:course===c.name?"#eaf1fa":"white"}} onClick={()=>{setCourse(c.name);setQuizTarget(c.name);setNotice("");}}><div className="row"><div className="file-icon"><BookOpen size={19}/></div><div className="grow"><div className="item-title">{c.name}</div><div className="item-meta">{c.students} siswa · Kode: {c.code}</div></div><ChevronRight size={17}/></div></button>)}</div></Card>
          <Card title={`Kelola ${course}`}><Tabs items={["Materi","Kuis","Catatan"]} value={courseTab} onChange={setCourseTab}/>{courseTab==="Materi"&&<><div className="field"><label>Jenis dokumen</label><select value={docType} onChange={e=>setDocType(e.target.value)}>{["Materi pembelajaran","RPP / Modul ajar","Tugas / Lembar kerja","Presentasi","Dokumen lainnya"].map(v=><option key={v}>{v}</option>)}</select></div><Field label="Nama file (simulasi)"><input value={docName} onChange={e=>setDocName(e.target.value)} placeholder="Materi Jurnal Umum.pdf"/></Field><Field label="Deskripsi"><textarea value={docDesc} onChange={e=>setDocDesc(e.target.value)} placeholder="Instruksi untuk siswa"/></Field><Button primary onClick={addDocument}><UploadCloud size={15}/> Tambahkan dokumen</Button><Notice success={notice.includes("ditambahkan")}>{notice}</Notice><p className="small muted">Prototype menyimpan metadata saja. Integrasi storage diperlukan untuk file fisik PDF/Word/PPT/Excel/gambar.</p><hr style={{border:0,borderTop:"1px solid var(--line)",margin:"18px 0"}}/><Field label="Cari dokumen"><input value={searchDoc} onChange={e=>setSearchDoc(e.target.value)} placeholder="Cari materi..."/></Field>{docsForCourse.map(d=><div className="item" key={d.id}><div className="row"><div className="file-icon"><FileText size={19}/></div><div className="grow"><div className="item-title">{d.name}</div><div className="item-meta">{d.type} · {d.date}</div><div className="small" style={{marginTop:6}}>{d.desc}</div></div><button className="btn danger" title="Hapus dari demo" onClick={()=>setDocs(prev=>prev.filter(x=>x.id!==d.id))}><Trash2 size={15}/></button></div></div>)}</>}{courseTab==="Kuis"&&<><p className="muted small">Kuis yang diterbitkan untuk kursus ini.</p>{quizzes.filter(q=>q.course===course).map(q=><div className="item" key={q.id}><div className="item-title">{q.title}</div><div className="item-meta">{q.type} · {q.count} soal</div></div>)}<Button primary onClick={()=>{setQuizTarget(course);setPage("Penyusun Quiz")}}><Plus size={15}/> Buat quiz untuk kelas ini</Button></>}{courseTab==="Catatan"&&<><Field label="Catatan/pengumuman kelas"><textarea value={classNotes} onChange={e=>setClassNotes(e.target.value)}/></Field><Button primary onClick={()=>setNotice("Catatan kelas tersimpan pada simulasi.")}><Save size={15}/> Simpan catatan</Button><Notice>{notice}</Notice></>}</Card></div>
        </>}
        {page==="Penyusun Quiz" && role==="Guru" && <>
          <Heading title="Penyusun Quiz" desc="Buat soal dengan AI atau input manual, tinjau, lalu terbitkan ke kursus yang dipilih."/>
          <Card><Tabs items={["AI","Manual"]} value={quizMode} onChange={setQuizMode}/><div className="grid grid-2"><Field label="Judul kuis"><input value={quizTitle} onChange={e=>setQuizTitle(e.target.value)}/></Field><Field label="Topik/materi"><input value={quizTopic} onChange={e=>setQuizTopic(e.target.value)}/></Field><Field label="Tipe soal"><select value={quizType} onChange={e=>setQuizType(e.target.value)}>{["Pilihan ganda","Isian singkat","Esai","Benar / salah","Flashcards","Campuran"].map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Jumlah soal"><select value={quizCount} onChange={e=>setQuizCount(e.target.value)}>{["5","10","15","20","30"].map(v=><option key={v} value={v}>{v} soal</option>)}</select></Field></div>{quizMode==="Manual"&&<><Field label="Pertanyaan"><textarea value={manualQuestion} onChange={e=>setManualQuestion(e.target.value)}/></Field><Field label="Kunci jawaban/panduan"><input value={manualAnswer} onChange={e=>setManualAnswer(e.target.value)}/></Field></>}<div className="notice"><Sparkles size={15} style={{display:"inline",verticalAlign:"middle",marginRight:5}}/>{quizMode==="AI"?`Kriteria AI: ${quizTopic}, ${quizType}, ${quizCount} soal. Integrasi AI server diperlukan untuk menghasilkan soal sungguhan.`:"Soal manual dapat dimasukkan dan ditinjau sebelum publikasi."}</div><Button onClick={()=>setQuizMsg(quizMode==="AI"?"Draft contoh siap ditinjau. Hubungkan endpoint AI untuk generate soal sungguhan.":"Soal manual disiapkan dalam draft demo.")}><Sparkles size={15}/> {quizMode==="AI"?"Buat draft kuis dengan AI":"Simpan draft soal"}</Button><Notice>{quizMsg}</Notice></Card>
          <div style={{marginTop:18}} className="grid grid-2"><Card title="Preview soal"><div className="item"><div className="item-meta">SOAL 1</div><p style={{fontWeight:700}}>{quizMode==="Manual"?manualQuestion:`Dalam ${quizTopic}, pernyataan manakah yang paling tepat?`}</p>{["A. Jawaban berdasarkan konsep yang dipelajari","B. Jawaban yang tidak sesuai konsep","C. Tidak ada jawaban yang benar","D. Semua pilihan salah"].map(a=><div className="item" key={a} style={{background:"#f7f9fc"}}>{a}</div>)}<p className="small muted">Contoh preview. Tinjau dan edit soal sebelum dipublikasikan.</p></div></Card><Card title="Terbitkan kuis"><Field label="Pilih kursus tujuan"><select value={quizTarget} onChange={e=>setQuizTarget(e.target.value)}>{courses.map(c=><option key={c.name}>{c.name}</option>)}</select></Field><p className="small muted">Siswa yang bergabung ke kursus ini akan melihat kuis pada My Courses dan menu Quiz.</p><Button primary onClick={publishQuiz}><CheckCircle2 size={15}/> Terbitkan quiz ke kursus</Button><Notice success={quizMsg.includes("diterbitkan")}>{quizMsg}</Notice></Card></div>
          <div style={{marginTop:18}}><Card title="Kuis yang sudah terbit">{quizzes.map(q=><div className="item" key={q.id}><div className="row between"><div><div className="item-title">{q.title}</div><div className="item-meta">{q.course} · {q.type} · {q.count} soal</div></div><span className="badge good">Terbit</span></div></div>)}</Card></div>
        </>}
        {page==="Hasil Belajar" && role==="Guru" && <>
          <Heading title="Hasil Belajar" desc="Rekap nilai, distribusi, hasil kuis per siswa, dan input nilai manual."/>
          <Tabs items={["Rekap Nilai","Distribusi","Input Manual","Feedback"]} value={gradeTab} onChange={setGradeTab}/>
          {gradeTab==="Rekap Nilai"&&<><Card title="Rekap rata-rata kelas"><div className="table-wrap"><table><thead><tr><th>Kelas</th><th>Rata-rata</th><th>Status KKM</th><th>Progress</th></tr></thead><tbody>{classPerf.filter((c,i)=>showAllClasses||i<6).map(c=><tr key={c.name}><td>{c.name}</td><td className={c.avg<75?"low-text":""}>{c.avg}</td><td><span className={`badge ${c.avg<75?"bad":"good"}`}>{c.avg<75?"Perlu remedial":"Di atas KKM"}</span></td><td style={{minWidth:120}}><div className="bar"><span className={c.avg<75?"low":""} style={{width:`${c.avg}%`}}/></div></td></tr>)}</tbody></table></div><div style={{marginTop:12}}><Button onClick={()=>setShowAllClasses(!showAllClasses)}>{showAllClasses?"Tampilkan ringkas":"Tampilkan semua kelas"}</Button></div></Card><div style={{marginTop:18}}><Card title="Hasil kuis per siswa"><div className="table-wrap"><table><thead><tr><th>Nama siswa</th><th>Kuis</th><th>Nilai</th></tr></thead><tbody>{[{name:"Alya Putri",quiz:"Kuis Jurnal Umum",score:88},{name:"Bima Pratama",quiz:"Kuis Jurnal Umum",score:68},{name:"Citra Dewi",quiz:"Latihan Persamaan Akuntansi",score:92},{name:"Dani Saputra",quiz:"Latihan Persamaan Akuntansi",score:72}].map(g=><tr key={g.name}><td>{g.name}</td><td>{g.quiz}</td><td className={g.score<75?"low-text":""}>{g.score}</td></tr>)}</tbody></table></div></Card></div></>}
          {gradeTab==="Distribusi"&&<Card title="Distribusi nilai"><div style={{height:300}}><ResponsiveContainer width="100%" height="100%"><BarChart data={[{range:"90–100",count:24},{range:"80–89",count:38},{range:"75–79",count:21},{range:"Di bawah 75",count:27}]}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="range"/><YAxis/><Tooltip/><Bar dataKey="count" name="Jumlah siswa" fill="#3478c5" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div><p className="small muted">Angka grafik merupakan data ilustrasi.</p></Card>}
          {gradeTab==="Input Manual"&&<Card title="Input nilai manual"><Field label="Nama siswa"><input value={gradeStudent} onChange={e=>setGradeStudent(e.target.value)}/></Field><Field label="Kelas"><select value={gradeCourse} onChange={e=>setGradeCourse(e.target.value)}>{courses.map(c=><option key={c.name}>{c.name}</option>)}</select></Field><Field label="Nilai (0–100)"><input type="number" min="0" max="100" value={gradeValue} onChange={e=>setGradeValue(e.target.value)}/></Field><Button primary onClick={saveGrade}><Save size={15}/> Simpan nilai</Button><Notice>{gradeMsg}</Notice>{manualGrades.map((g,i)=><div className="item" key={i}>{g.name} · {g.course} · <strong className={g.value<75?"low-text":""}>{g.value}</strong></div>)}</Card>}
          {gradeTab==="Feedback"&&<Card title="Ringkasan feedback"><div className="grid grid-2"><Stat icon={Star} label="Rata-rata" value={`${avgFeedback}/5`}/><Stat icon={MessagesSquare} label="Respons" value={filteredFeedback.length}/></div><div style={{marginTop:12}}><Button primary onClick={()=>setPage("Feedback Siswa")}>Buka rekap lengkap</Button></div></Card>}
        </>}
        {page==="Penyusunan RPP" && role==="Guru" && <>
          <Heading title="Penyusunan RPP dengan AI" desc="Form bertahap, model pembelajaran, preview yang dapat diedit, dan pilihan format dokumen."/>
          <div className="stepper">{["Identitas","Kriteria","Preview","Dokumen"].map((s,i)=><div key={s} className={`step ${rppStep===i+1?"active":""}`}><strong>{i+1}</strong><br/>{s}</div>)}</div>
          <Card title={`Langkah ${rppStep} dari 4`}>
            {rppStep===1&&<><div className="grid grid-2"><Field label="Nama guru"><input value={rpp.teacher} onChange={e=>setRppField("teacher",e.target.value)}/></Field><Field label="Nama sekolah"><input value={rpp.school} onChange={e=>setRppField("school",e.target.value)}/></Field><Field label="Kelas/fase"><input value={rpp.className} onChange={e=>setRppField("className",e.target.value)}/></Field><Field label="Semester/tahun ajaran"><input value={rpp.semester} onChange={e=>setRppField("semester",e.target.value)}/></Field></div><Button primary onClick={()=>setRppStep(2)}>Lanjut <ArrowRight size={15}/></Button></>}
            {rppStep===2&&<><div className="grid grid-2"><Field label="Mata pelajaran"><input value={rpp.subject} onChange={e=>setRppField("subject",e.target.value)}/></Field><Field label="Topik/materi"><input value={rpp.topic} onChange={e=>setRppField("topic",e.target.value)}/></Field></div><Field label="Model pembelajaran"><select value={rpp.model} onChange={e=>setRppField("model",e.target.value)}>{["Problem Based Learning (PBL)","Project Based Learning (PjBL)","Discovery Learning","Inquiry Learning","Cooperative Learning","Contextual Teaching and Learning","Direct Instruction","Flipped Classroom","TaRL","Pembelajaran Berdiferensiasi","Case Method","Kustom"].map(v=><option key={v}>{v}</option>)}</select></Field>{rpp.model==="Kustom"&&<Field label="Model kustom"><input value={customModel} onChange={e=>setCustomModel(e.target.value)} placeholder="Tulis model lain"/></Field>}<Field label="Tujuan pembelajaran"><textarea value={rpp.objective} onChange={e=>setRppField("objective",e.target.value)}/></Field><div className="grid grid-2"><Field label="Alokasi waktu"><input value={rpp.time} onChange={e=>setRppField("time",e.target.value)}/></Field><Field label="Media pembelajaran"><input value={rpp.media} onChange={e=>setRppField("media",e.target.value)}/></Field></div><Field label="Referensi"><textarea value={rpp.references} onChange={e=>setRppField("references",e.target.value)}/></Field><Field label="Kriteria/teknik asesmen"><textarea value={rpp.assessment} onChange={e=>setRppField("assessment",e.target.value)}/></Field><div className="actions"><Button onClick={()=>setRppStep(1)}>Kembali</Button><Button primary onClick={()=>{setRppStep(3);setRppSaved(false);setRppMsg("")}}><Sparkles size={15}/> Buat draft & preview</Button></div></>}
            {rppStep===3&&<><div className="item" style={{padding:24,lineHeight:1.65}}><h2 style={{textAlign:"center",fontSize:19}}>RENCANA PELAKSANAAN PEMBELAJARAN</h2><p><strong>Satuan Pendidikan:</strong> {rpp.school}<br/><strong>Guru:</strong> {rpp.teacher}<br/><strong>Kelas:</strong> {rpp.className} · {rpp.semester}<br/><strong>Mata Pelajaran:</strong> {rpp.subject}<br/><strong>Topik:</strong> {rpp.topic}<br/><strong>Model:</strong> {rpp.model==="Kustom"?customModel:rpp.model}<br/><strong>Alokasi Waktu:</strong> {rpp.time}</p><h3>Tujuan Pembelajaran</h3><p>{rpp.objective}</p><h3>Kegiatan Pembelajaran</h3><p><strong>Pendahuluan:</strong> Apersepsi, penyampaian tujuan, dan pengaitan materi dengan konteks nyata.</p><p><strong>Inti:</strong> Analisis kasus, diskusi, latihan, presentasi, dan umpan balik sesuai model pembelajaran.</p><p><strong>Penutup:</strong> Refleksi, kesimpulan, dan tindak lanjut.</p><h3>Asesmen</h3><p>{rpp.assessment}</p><h3>Media dan referensi</h3><p>{rpp.media}<br/>{rpp.references}</p></div><Field label="Catatan tambahan / edit bagian RPP"><textarea value={rpp.extra} onChange={e=>setRppField("extra",e.target.value)} placeholder="Diferensiasi, remedial, pengayaan, atau rincian lain..."/></Field><div className="notice">Ini draft contoh. Integrasi AI produksi dibutuhkan untuk menghasilkan RPP yang lebih lengkap berdasarkan kriteria dan kurikulum yang dipilih.</div><div className="actions"><Button onClick={()=>setRppStep(2)}>Edit kriteria</Button><Button primary onClick={()=>setRppStep(4)}>Lanjut ke dokumen <ArrowRight size={15}/></Button></div></>}
            {rppStep===4&&<><p className="muted">Pilih format output. Untuk saat ini, prototype dapat menyalin teks RPP; generator file Word/PDF perlu ditambahkan.</p><div className="grid grid-2"><button className={`item ${rppFormat==="Word"?"active":""}`} onClick={()=>setRppFormat("Word")} style={{borderColor:rppFormat==="Word"?"var(--blue)":undefined}}><FileText size={25}/><div className="item-title">Microsoft Word (.docx)</div><div className="item-meta">Dapat diedit</div></button><button className={`item ${rppFormat==="PDF"?"active":""}`} onClick={()=>setRppFormat("PDF")} style={{borderColor:rppFormat==="PDF"?"var(--blue)":undefined}}><File size={25}/><div className="item-title">PDF (.pdf)</div><div className="item-meta">Untuk dibagikan/cetak</div></button></div><div className="actions"><Button onClick={()=>setRppStep(3)}>Kembali ke preview</Button><Button primary onClick={()=>{setRppSaved(true);setRppMsg(`RPP dipersiapkan untuk format ${rppFormat}. Gunakan Salin teks RPP pada prototype ini.`)}}><Save size={15}/> Konfirmasi dokumen</Button></div>{rppSaved&&<div className="notice success">{rppMsg}<div className="actions" style={{marginTop:10}}><Button onClick={copyRpp}>Salin teks RPP</Button><Button onClick={()=>{setDocs(prev=>[{id:Date.now(),course:rpp.className,name:`RPP ${rpp.topic}.${rppFormat==="Word"?"docx":"pdf"}`,type:"RPP / Modul ajar",desc:`RPP ${rpp.subject} — ${rpp.topic}`,date:"22 Okt 2026"},...prev]);setRppMsg(`Metadata RPP ditambahkan ke dokumen kursus ${rpp.className}.`)}}>Tambahkan ke Courses Class</Button><Button onClick={()=>{setCourse(rpp.className);setPage("Courses Class")}}>Buka kursus</Button></div></div>}</>}
          </Card>
        </>}
        {page==="Feedback Siswa" && role==="Guru" && <>
          <Heading title="Rekap Feedback Siswa" desc="Pantau seluruh respons, rata-rata penilaian, distribusi rating, dan komentar."/>
          <Card><div className="grid grid-2"><Field label="Filter kelas"><select value={feedbackClass} onChange={e=>setFeedbackClass(e.target.value)}><option>Semua kelas</option>{courses.map(c=><option key={c.name}>{c.name}</option>)}</select></Field><Field label="Periode"><select value={feedbackSemester} onChange={e=>setFeedbackSemester(e.target.value)}>{["Semua semester","Semester 1","Semester 2"].map(v=><option key={v}>{v}</option>)}</select></Field></div><div className="grid grid-3"><Stat icon={Star} label="Rata-rata rating" value={`${avgFeedback}/5`}/><Stat icon={MessagesSquare} label="Jumlah respons" value={filteredFeedback.length}/><Stat icon={Users} label="Rating 4–5" value={`${filteredFeedback.length?Math.round(filteredFeedback.filter(f=>f.rating>=4).length/filteredFeedback.length*100):0}%`}/></div><div style={{marginTop:22}}><h3>Distribusi penilaian</h3>{[5,4,3,2,1].map(s=><Progress key={s} name={`${s} bintang (${filteredFeedback.filter(f=>f.rating===s).length} respons)`} value={filteredFeedback.length?filteredFeedback.filter(f=>f.rating===s).length/filteredFeedback.length*100:0}/>)}</div><div style={{marginTop:22}}><Field label="Cari komentar"><input value={feedbackSearch} onChange={e=>setFeedbackSearch(e.target.value)} placeholder="Ketik kata kunci..."/></Field><h3>Komentar individual</h3>{filteredFeedback.length?filteredFeedback.map(f=><div className="item" key={f.id}><div className="row between"><div><div className="item-title">{f.className}</div><div className="item-meta">{f.semester}</div></div><span className="stars">{"★".repeat(f.rating)}{"☆".repeat(5-f.rating)}</span></div><p style={{fontSize:13,marginBottom:0}}>{f.comment}</p></div>):<div className="empty">Belum ada feedback sesuai filter.</div>}</div></Card>
        </>}
        {page==="My Courses" && role==="Siswa" && <>
          <Heading title="My Courses" desc="Gabung kursus dan buka materi, dokumen, RPP, pengumuman, tugas, dan kuis dari guru."/>
          <Card title="Gabung dengan kode kursus"><div className="row"><input className="input grow" value={joinCode} onChange={e=>setJoinCode(e.target.value)} placeholder="Contoh: AKL-X1-26"/><Button primary onClick={()=>{const found=courses.find(c=>c.code.toLowerCase()===joinCode.trim().toLowerCase());if(found){setJoined(prev=>prev.includes(found.name)?prev:[...prev,found.name]);setCourse(found.name);setNotice(`Berhasil bergabung ke ${found.name} (simulasi).`);setJoinCode("");}else setNotice("Kode tidak ditemukan. Gunakan kode dari guru.")}}>Gabung</Button></div><Notice>{notice}</Notice></Card>
          <div style={{marginTop:18}} className="grid grid-3">{courses.filter(c=>joined.includes(c.name)).map(c=><button className="item" key={c.name} onClick={()=>{setCourse(c.name);setCourseTab("Materi")}} style={{textAlign:"left",borderColor:course===c.name?"var(--blue)":undefined}}><div className="file-icon"><BookOpen/></div><div className="item-title" style={{marginTop:10}}>{c.name}</div><div className="item-meta">{docs.filter(d=>d.course===c.name).length} dokumen · {quizzes.filter(q=>q.course===c.name).length} kuis</div><div className="item-meta">Kode {c.code}</div></button>)}</div>
          <div style={{marginTop:18}}><Card title={`Konten kursus: ${course}`}><Tabs items={["Materi","Tugas","Pengumuman","Quiz"]} value={courseTab} onChange={setCourseTab}/>{courseTab==="Materi"&&docs.filter(d=>d.course===course).map(d=><div className="item" key={d.id}><div className="row"><div className="file-icon"><FileText/></div><div className="grow"><div className="item-title">{d.name}</div><div className="item-meta">{d.type} · {d.date}</div><p className="small">{d.desc}</p></div><Button onClick={()=>setNotice("Buka/unduh file asli memerlukan integrasi storage pada versi produksi.")}><Download size={14}/> Buka</Button></div></div>)}{courseTab==="Materi"&&docs.filter(d=>d.course===course).length===0&&<div className="empty">Guru belum mengunggah materi.</div>}{courseTab==="Quiz"&&quizzes.filter(q=>q.course===course).map(q=><div className="item" key={q.id}><div className="item-title">{q.title}</div><div className="item-meta">{q.type} · {q.count} soal</div><div style={{marginTop:10}}><Button primary onClick={()=>{setActiveQuiz(q);setQuizMsg("");setStudentAnswer("");setPage("Quiz")}}>Kerjakan kuis</Button></div></div>)}{courseTab==="Quiz"&&quizzes.filter(q=>q.course===course).length===0&&<div className="empty">Belum ada kuis terbit untuk kursus ini.</div>}{courseTab==="Tugas"&&<div className="empty">Lihat dokumen lembar kerja pada tab Materi. Pengumpulan tugas online dapat diintegrasikan pada versi produksi.</div>}{courseTab==="Pengumuman"&&<div className="item">{classNotes}</div>}<Notice>{notice}</Notice></Card></div>
        </>}
        {page==="Quiz" && role==="Siswa" && <>
          <Heading title="Quiz" desc="Kuis dari kursus yang telah diikuti dan riwayat hasil pengerjaan."/>
          <Card title="Kuis tersedia"><Field label="Cari kuis"><input value={searchQuiz} onChange={e=>setSearchQuiz(e.target.value)} placeholder="Cari nama kuis..."/></Field>{quizzes.filter(q=>joined.includes(q.course)&&q.title.toLowerCase().includes(searchQuiz.toLowerCase())).map(q=><div className="item" key={q.id}><div className="row"><div className="file-icon"><ClipboardCheck/></div><div className="grow"><div className="item-title">{q.title}</div><div className="item-meta">{q.course} · {q.type} · {q.count} soal</div></div><Button primary onClick={()=>{setActiveQuiz(q);setQuizMsg("");setStudentAnswer("")}}>Mulai kuis</Button></div></div>)}</Card>
          {activeQuiz&&<div style={{marginTop:18}}><Card title={activeQuiz.title}><div className="badge">{activeQuiz.course} · Soal contoh 1 dari {activeQuiz.count}</div><p style={{fontWeight:700,marginTop:15}}>Transaksi pemilik menyetorkan uang tunai sebagai modal. Akun apa yang bertambah?</p>{["Kas dan modal","Beban dan utang","Pendapatan dan beban","Piutang dan beban"].map(a=><label key={a} className="item row" style={{cursor:"pointer"}}><input type="radio" name="student-answer" checked={studentAnswer===a} onChange={()=>setStudentAnswer(a)}/>{a}</label>)}<Button primary onClick={()=>{if(!studentAnswer)return setQuizMsg("Pilih jawaban terlebih dahulu.");const score=studentAnswer==="Kas dan modal"?100:0;setQuizHistory(prev=>[{title:activeQuiz.title,score,date:new Date().toLocaleDateString("id-ID")},...prev]);setQuizMsg(`Jawaban tersimpan pada demo. Nilai untuk satu soal contoh: ${score}.`)}}>Kirim jawaban</Button><Notice>{quizMsg}</Notice></Card></div>}
          <div style={{marginTop:18}}><Card title="Riwayat skor">{quizHistory.map((h,i)=><div className="item row between" key={`${h.title}-${i}`}><div><div className="item-title">{h.title}</div><div className="item-meta">{h.date}</div></div><strong className={h.score<75?"low-text":""}>{h.score}</strong></div>)}</Card></div>
        </>}
        {page==="Konsultasi AI" && role==="Siswa" && <>
          <Heading title="Konsultasi AI" desc="Diskusikan kelemahan belajar, nilai di bawah KKM, konsep, dan latihan soal."/>
          <Card title="Rekomendasi belajar"><div className="grid grid-2"><div className="item"><div className="item-title">Persamaan Dasar Akuntansi</div><div className="item-meta">Nilai 68 · KKM 75</div><Button onClick={()=>setConsultInput("Saya mendapat nilai 68 di Persamaan Dasar Akuntansi. Bantu saya belajar.")}>Bahas materi</Button></div><div className="item"><div className="item-title">Jurnal Penyesuaian</div><div className="item-meta">Nilai 72 · KKM 75</div><Button onClick={()=>setConsultInput("Bantu saya memahami Jurnal Penyesuaian dan berikan latihan.")}>Latihan soal</Button></div></div></Card>
          <div style={{marginTop:18}}><Card title="AI Tutor"><div className="chat">{chat.map((m,i)=><div key={i} className={`bubble ${m.who==="Kamu"?"user":""}`}><strong>{m.who}</strong><br/>{m.text}</div>)}</div><Field label="Pesan"><textarea value={consultInput} onChange={e=>setConsultInput(e.target.value)} placeholder="Contoh: Jelaskan persamaan dasar akuntansi dengan contoh sederhana."/></Field><Button primary onClick={askAI}><Send size={15}/> Kirim pertanyaan</Button><p className="small muted">AI belum menghasilkan jawaban nyata sampai API provider dikonfigurasi di server.</p></Card></div>
        </>}
        {page==="Feedback" && role==="Siswa" && <>
          <Heading title="Feedback Pembelajaran" desc="Masukanmu membantu guru memperbaiki pembelajaran."/>
          <Card title="Form feedback"><Field label="Kursus"><select value={course} onChange={e=>setCourse(e.target.value)}>{courses.filter(c=>joined.includes(c.name)).map(c=><option key={c.name}>{c.name}</option>)}</select></Field><Field label="Semester"><select><option>Semester 1</option><option>Semester 2</option></select></Field><Field label="Penilaian"><select value={feedbackRating} onChange={e=>setFeedbackRating(e.target.value)}>{[5,4,3,2,1].map(n=><option key={n} value={n}>{n} bintang {"★".repeat(n)}</option>)}</select></Field><Field label="Komentar dan saran"><textarea value={feedbackText} onChange={e=>setFeedbackText(e.target.value)} placeholder="Apa yang sudah baik? Apa yang perlu ditingkatkan?"/></Field><Button primary onClick={submitFeedback}><Send size={15}/> Kirim feedback</Button><Notice success={feedbackMsg.includes("terkirim")}>{feedbackMsg}</Notice></Card>
        </>}
        <div className="footer">EduCentered · Prototype front-end · Data contoh bersifat sementara · Jangan gunakan untuk data siswa nyata sebelum autentikasi dan keamanan diimplementasikan.</div>
      </main>
    </div>
  </div>;
}

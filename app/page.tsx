"use client"

import { useState, useEffect, useRef } from "react"
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  User,
  Briefcase,
  Send,
  Calendar,
} from "lucide-react"
import { 
  SiPhp, 
  SiLaravel, 
  SiJavascript, 
  SiHtml5, 
  SiCss3, 
  SiFlutter, 
  SiGo 
} from "react-icons/si"
import Image from "next/image"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<
    { left: number; top: number; delay: number; duration: number }[]
  >([])

  const fullText = "Programmer | Tech Enthusiast"

  // Typing animation
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Intersection Observer for active sections
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  useEffect(() => {
    // Generate 20 random particles only on client
    const arr = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }))
    setParticles(arr)
  }, [])

  const skills = [
    { name: "PHP Native", icon: SiPhp, color: "text-[#777BB4]" },
    { name: "Laravel", icon: SiLaravel, color: "text-[#FF2D20]" },
    { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
    { name: "HTML", icon: SiHtml5, color: "text-[#E34F26]" },
    { name: "CSS", icon: SiCss3, color: "text-[#1572B6]" },
    { name: "Flutter", icon: SiFlutter, color: "text-[#02569B]" },
    { name: "Golang", icon: SiGo, color: "text-[#00ADD8]" },
  ]

  const education = [
    {
      school: "Politeknik Negeri Batam",
      period: "2024 - Sekarang",
      status: "Sedang Menempuh",
      image: "/poltek.png",
      description: "Teknik Informatika - Program Studi Teknologi Rekayasa Perangkat Lunak",
    },
    {
      school: "SMAN 20 Batam",
      period: "2021 - 2024",
      status: "Lulus",
      image: "/SMAN20.png",
      description: "Jurusan IPA - Dasar matematika serta ilmu mengenai fisika dan kimia",
    },
    {
      school: "SMPN 42",
      period: "2018 - 2021",
      status: "Lulus",
      image: "/SMPN42.jpg",
      description: "Pendidikan dasar dengan prestasi akademik yang baik",
    },
  ]

  const projects = [
    {
      title: "Virtual Event Check In (VEC)",
      description:
        "Aplikasi Absensi Peserta Acara Online adalah solusi digital yang dirancang untuk mempermudah pencatatan kehadiran peserta pada berbagai jenis acara online seperti webinar, workshop, seminar, dan konferensi. Aplikasi ini memungkinkan penyelenggara acara untuk mengelola kehadiran peserta secara efektif dan efisien.",
      tech: [ "PHP Native", "MySQL", "AJAX", "jQuery","SweetAlert", "Bootstrap"],
      image: "/vec-sem1.png",
      link: "https://pbl.polibatam.ac.id/pamerin/detail.php?title=aplikasi-absensi-peserta-acara-online&id=MjU1NQ==&ta=NQ==&id_tim=Mjg1Mg==",
      status: "Completed",
      year: "2024",
    },
    {
      title: "Tracer Study Polibatam",
      description:
        "Aplikasi web untuk melacak jejak karir alumni setelah lulus serta memberikan informasi terkait perkembangan karir mereka. fitur utama pada aplikasi ini yaitu kuesioner yang dinamis serta statistik kuesioner dan statistik alumni.",
      tech: ["Laravel", "MySQL", "JavaScript", "Tailwind CSS", "Chart.js","Phpspreadsheet"],
      image: "/Tracer BG.png",
      link: "https://pbl.polibatam.ac.id/pamerin/detail.php?title=pengembangan-web-tracer-study-polibatam&id=MzEyNw==&ta=Ng==&id_tim=MzkxNA==",
      status: "Completed",
      year: "2025",
    },
    {
      title: "Berdikari Talent Cerdas",
      description:
        "Aplikasi web untuk pelaksanaan jobfair polibatam serta fitur yang memberikan kecocokan pekerjaan melalui AI saya terlibat dalam pembuatan fitur mencatat kehadiran peserta jobfair, fitur ini memungkinkan peserta untuk melakukan check-in dan check-out secara digital.",
      tech: [ "JavaScript", "Laravel", "Bootstrap","Mysql"],
      image: "/berdikari.png",
      link: "https://talentcerdas.id",
      status: "Ongoing",
      year: "2025",
    },
    {
      title: "Jobnova aplikasi pencari kerja mobile",
      description:
        "Aplikasi mobile untuk pencarian kerja yang memudahkan pengguna dalam menemukan lowongan pekerjaan sesuai dengan minat dan keahlian mereka. Fitur utama pada aplikasi ini yaitu rekomendasi lowongan berbasis ai sesuai dengan minat dan keahlian pengguna. aplikasi ini juga terkoneksi dengan website talentcerdas.id",
      tech: [ "Flutter", "Dart", "Firebase","Golang","Swagger UI", "Mysql"],
      link: "https://pbl.polibatam.ac.id/pamerin/detail.php?title=aplikasi-pencari-kerja&id=NDQ5OQ==&ta=Nw==&id_tim=NTQwNg==",
      image: "/Jobnova.png",
      status: "Completed",
      year : "2026",
    }

  ]

  //const achievements = [
 //   { title: "Best Student Project", year: "2023", icon: "🏆" },
   // { title: "Web Development Certificate", year: "2022", icon: "📜" },
//{ title: "Programming Competition", year: "2023", icon: "🥇" },
  //]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-x-hidden">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${p.left}%`,
              top: `calc(${p.top}% + ${scrollY * 0.05}px)`, // bergerak saat scroll
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-xl z-50 border-b border-gray-200/50 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AndriPutra
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {["home", "about", "skills", "education", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 px-4 py-2 rounded-xl font-medium text-sm relative overflow-hidden group ${
                    activeSection === item
                      ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  {activeSection !== item && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-medium text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
              Contact Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span
                  className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                    isMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                    isMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl mb-4 shadow-xl border border-gray-200/50 p-4">
              <div className="space-y-2">
                {["home", "about", "skills", "education", "projects", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                      activeSection === item
                        ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <div className="pt-2 border-t border-gray-200">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Hire Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24 md:pt-28"
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
              animationDelay: "1s",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-10 md:mb-12 relative">
            {/* Hero Image with enhanced styling */}
            <div className="relative inline-block group">
              {/* Animated background rings */}
              <div className="absolute inset-0 rounded-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-2xl scale-110 animate-pulse" />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl scale-125 animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              {/* Main photo container */}
              <div className="relative">
                {/* Photo frame with gradient border */}
                <div className="relative p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow">
                  <div className="bg-white p-2 rounded-full">
                    <Image
                      src="/andri-foto.jpeg"
                      alt="Andri Putra Desyandra Siregar - Web Developer"
                      width={320}
                      height={320}
                      className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full object-cover bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl group-hover:scale-105 transition-all duration-500"
                      style={{
                        filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))",
                        transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
                      }}
                    />
                  </div>
                </div>

                {/* Floating badges around photo */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl animate-bounce shadow-xl border-4 border-white">
                  💻
                </div>
                <div
                  className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl animate-bounce shadow-xl border-4 border-white"
                  style={{ animationDelay: "0.5s" }}
                >
                  🚀
                </div>
                <div
                  className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-lg animate-bounce shadow-lg border-3 border-white"
                  style={{ animationDelay: "1s" }}
                >
                  ⚡
                </div>
                <div
                  className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-lg animate-bounce shadow-lg border-3 border-white"
                  style={{ animationDelay: "1.5s" }}
                >
                  🎨
                </div>

                {/* Status indicator */}
                <div className="absolute bottom-4 right-4 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-lg animate-pulse">
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-full blur-3xl"></div>
            </div>

            {/* Photo caption */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Available for projects</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Andri Putra
            </span>
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Desyandra Siregar
            </span>
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-8 h-8 font-medium">
            {typedText}
            <span className="animate-pulse text-blue-600">|</span>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            A beginner web developer who wants to create a project that can be useful to society :)
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <button
              onClick={() => scrollToSection("projects")}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <Briefcase className="mr-2" size={20} />
              View My Work
            </button>
      
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            {[
              { icon: Github, href: "https://github.com/andriputra-ds", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/andri-putra-770562332/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:andriputra110906@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl hover:scale-110 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("about")}
            className="animate-bounce text-gray-400 hover:text-blue-600 transition-colors duration-300"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">About </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <User className="text-blue-600 mb-4" size={32} />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Who I Am</h3>
                <p className="text-gray-600 leading-relaxed">
                  Saya adalah seorang web developer yang bersemangat dalam menciptakan perangkat lunak yang bermanafaat bagi masyarakat. Dengan
                  pengalaman dalam berbagai teknologi web, saya selalu berusaha untuk terus belajar dan mengembangkan
                  kemampuan saya dalam dunia programming. Saya percaya bahwa teknologi dapat mengubah cara kita bekerja
                  dan berinteraksi.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Briefcase className="text-purple-600 mb-4" size={32} />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">What I Do</h3>
                <p className="text-gray-600 leading-relaxed">
                  Saya mengkhususkan diri dalam pengembangan aplikasi web menggunakan PHP, Laravel, dan
                  JavaScript. Saya juga memiliki pengalaman dalam membuat website responsif dan user-friendly dengan
                  fokus pada performa, keamanan, dan user experience yang optimal untuk berbagai jenis bisnis. serta mengeksplor lebih luas lagi mengenai perkembangan teknologi.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Info</h3>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Location", value: "Batam, Kepulauan Riau, Indonesia" },
                    { icon: Mail, label: "Email", value: "andriputra110906@gmail.com" },
                    { icon: Phone, label: "Phone", value: "+62 821-7363-4506" },
                    { icon: Calendar, label: "Age", value: "19 Years Old" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center">
                      <Icon size={18} className="text-blue-600 mr-4 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">{label}</p>
                        <p className="text-gray-700 font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Interests & Hobbies</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Web Development",
                    "UI/UX Design",
                    "Mobile Apps",
                    "Open Source",
                    "Tech Innovation",
                    "Problem Solving",
                    "Basketball",
                    "Gaming",
                    "Calisthenics",
                    "Running",
                  ].map((interest) => (
                    <span
                      key={interest}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 hover:shadow-md transition-all duration-300"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">My </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Berikut adalah teknologi dan tools yang saya kuasai dalam pengembangan web modern
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <IconComponent className={`text-3xl mr-3 ${skill.color}`} />
                      <span className="text-gray-800 font-semibold">{skill.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Code className="text-blue-600 mb-6" size={48} />
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Technical Expertise</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-blue-600 font-semibold mb-2 flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      Backend Development
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      PHP Native, Laravel Framework, RESTful API, MySQL Database, Authentication & Authorization
                    </p>
                  </div>
                  <div>
                    <h4 className="text-purple-600 font-semibold mb-2 flex items-center">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                      Frontend Development
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      HTML5, CSS3, JavaScript ES6+, Responsive Design, Bootstrap, jQuery, AJAX
                    </p>
                  </div>
                  <div>
                    <h4 className="text-green-600 font-semibold mb-2 flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Tools & Others
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Git & GitHub, VS Code, XAMPP, Composer, NPM, Postman, phpMyAdmin
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Currently Learning</h3>
                <div className="flex flex-wrap gap-2">
                  {["React.js", "Next.js", "TypeScript", "Golang"].map((tech) => (
                    <span
                      key={tech}
                      className="bg-white text-gray-700 px-3 py-2 rounded-full text-sm font-medium shadow-sm border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 sm:py-20 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">My </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Education
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Perjalanan pendidikan yang membentuk fondasi pengetahuan dan karakter saya
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>

            {education.map((edu, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} ml-12 md:ml-0`}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-start mb-4">
                      <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                        <Image
                          src={edu.image}
                          alt={edu.school}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{edu.school}</h3>
                        <p className="text-blue-600 font-medium mb-2">{edu.period}</p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{edu.description}</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            edu.status === "Sedang Menempuh"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-blue-100 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {edu.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">My </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Beberapa proyek yang telah saya kerjakan dengan berbagai teknologi dan solusi inovatif
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group hover:scale-105"
              >
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">{project.year}</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <a
                      href={project.link}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300 font-medium"
                    >
                      <span className="mr-2">View Project</span>
                      <ExternalLink size={16} />
                    </a>
           
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Get In </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Mari berkolaborasi! Saya terbuka untuk diskusi proyek baru, peluang kerja sama, dan pertanyaan seputar
              pengembangan web
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: "Email",
                      value: "andriputra110906@gmail.com",
                      description: "Send me an email anytime!",
                    },
                    {
                      icon: Phone,
                      title: "Phone",
                      value: "+62 812-3456-7890",
                      description: "Call me for urgent matters",
                    },
                    {
                      icon: MapPin,
                      title: "Location",
                      value: "Batam, Kepulauan Riau",
                      description: "Indonesia",
                    },
                  ].map(({ icon: Icon, title, value, description }) => (
                    <div key={title} className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Icon className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold">{title}</p>
                        <p className="text-gray-600 font-medium">{value}</p>
                        <p className="text-gray-500 text-sm">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Follow Me</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Github, href: "https://github.com/andriputra-ds", label: "GitHub", color: "from-gray-600 to-gray-700" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/andri-putra-770562332/", label: "LinkedIn", color: "from-blue-600 to-blue-700" },
                    { icon: Mail, href: "mailto:andriputra110906@gmail.com", label: "Email", color: "from-purple-600 to-purple-700" },
                  ].map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-300`}
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Response</h3>
                <p className="text-gray-600 text-sm mb-4">
                  I typically respond to emails within 24 hours. For urgent matters, please call directly.
                </p>
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">Available for new projects</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Message</h3>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <Send className="mr-2" size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                Andri<span className="text-blue-400">Dev</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Passionate web developer creating innovative digital solutions with modern technologies.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {["About", "Skills", "Projects", "Contact"].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="block text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "https://github.com/andriputra-ds" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/andri-putra-770562332/"},
                  { icon: Mail, href: "mailto:andriputra110906@gmail.com" },
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">© 2025 Andri Putra Desyandra Siregar. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-2">Made with ❤️ using React & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

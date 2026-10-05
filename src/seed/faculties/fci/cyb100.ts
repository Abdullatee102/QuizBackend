// src/seed/faculties/fci/cyb100.ts
import type { SeedCourse } from '../../types.js';

export const cyb100Courses: SeedCourse[] = [
  // 1. CYB 101: Introduction to Cyber Security
  {
    code: 'CYB 101',
    title: 'Introduction to Cyber Security',
    level: 100,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What does the CIA triad stand for in information security?',
        options: ['Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Control, Identification, Authentication', 'Cyber, Internet, Application'],
        correctAnswer: 'Confidentiality, Integrity, Availability',
      },
      {
        type: 'cbt',
        question: 'Which type of attack involves tricking users into revealing sensitive credentials through fraudulent emails?',
        options: ['DDoS', 'Phishing', 'SQL Injection', 'Man-in-the-Middle'],
        correctAnswer: 'Phishing',
      },
      {
        type: 'cbt',
        question: 'What is malware designed to encrypt victim files and demand payment for the decryption key called?',
        options: ['Spyware', 'Adware', 'Ransomware', 'Trojan Horse'],
        correctAnswer: 'Ransomware',
      },
      {
        type: 'cbt',
        question: 'What is a vulnerability in cybersecurity?',
        options: ['A malicious software program', 'A weakness or flaw in system design, implementation, or operation', 'An authorized security audit', 'A hardware firewall device'],
        correctAnswer: 'A weakness or flaw in system design, implementation, or operation',
      },
      {
        type: 'cbt',
        question: 'Which principle of security states that users should be granted only the minimum access rights necessary to perform their jobs?',
        options: ['Principle of Least Privilege', 'Defense in Depth', 'Fail-Safe Defaults', 'Open Design'],
        correctAnswer: 'Principle of Least Privilege',
      },
      {
        type: 'cbt',
        question: 'What type of malware disguises itself as legitimate or harmless software to deceive users into installing it?',
        options: ['Worm', 'Rootkit', 'Trojan Horse', 'Logic Bomb'],
        correctAnswer: 'Trojan Horse',
      },
      {
        type: 'cbt',
        question: 'What form of social engineering occurs in person by following an authorized individual through a secure door without badges?',
        options: ['Tailgating / Piggybacking', 'Phishing', 'Vishing', 'Watering Hole attack'],
        correctAnswer: 'Tailgating / Piggybacking',
      },
      {
        type: 'cbt',
        question: 'Which of the following is a multi-factor authentication (MFA) combination?',
        options: ['Password and PIN', 'Password and fingerprint biometric', 'Username and mother maiden name', 'Two different passwords'],
        correctAnswer: 'Password and fingerprint biometric',
      },
      {
        type: 'cbt',
        question: 'What is a computer compromised by malware and controlled remotely as part of a botnet called?',
        options: ['Zombie', 'Honeypot', 'Firewall', 'Proxy'],
        correctAnswer: 'Zombie',
      },
      {
        type: 'cbt',
        question: 'Which term describes an unpatched security flaw actively exploited before the vendor becomes aware or releases a fix?',
        options: ['Zero-Day Vulnerability', 'Buffer Overflow', 'Syntax Error', 'Deadlock'],
        correctAnswer: 'Zero-Day Vulnerability',
      },
    ],
  },

  // 2. CYB 103: Foundations of Computing & Cybersecurity Lab
  {
    code: 'CYB 103',
    title: 'Foundations of Computing & Cybersecurity Lab',
    level: 100,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'Which command-line tool is standardly used in Linux to test network connectivity and measure round-trip latency to a host?',
        options: ['ping', 'traceroute', 'ifconfig', 'netstat'],
        correctAnswer: 'ping',
      },
      {
        type: 'cbt',
        question: 'What does the Linux command "chmod 700 filename" set permissions to?',
        options: ['Read, write, and execute for owner only', 'Read and execute for all users', 'Read only for owner', 'Full public access for everyone'],
        correctAnswer: 'Read, write, and execute for owner only',
      },
      {
        type: 'cbt',
        question: 'Which network utility displays all active network connections and listening ports on a local computer?',
        options: ['netstat', 'nslookup', 'grep', 'mkdir'],
        correctAnswer: 'netstat',
      },
      {
        type: 'cbt',
        question: 'What is the standard loopback IP address in IPv4 networking?',
        options: ['127.0.0.1', '192.168.1.1', '10.0.0.1', '255.255.255.0'],
        correctAnswer: '127.0.0.1',
      },
      {
        type: 'cbt',
        question: 'Which cryptographic hash utility is used on Linux terminals to verify file download integrity?',
        options: ['sha256sum', 'cat', 'diff', 'chmod'],
        correctAnswer: 'sha256sum',
      },
      {
        type: 'cbt',
        question: 'What does the command "ipconfig /all" do in a Windows command prompt?',
        options: ['Displays detailed TCP/IP network configuration and MAC addresses', 'Reboots the network adapter', 'Clears DNS cache', 'Pings the gateway router'],
        correctAnswer: 'Displays detailed TCP/IP network configuration and MAC addresses',
      },
      {
        type: 'cbt',
        question: 'Which terminal text editor in Linux is famous for its distinct Command Mode and Insert Mode?',
        options: ['Vim', 'Nano', 'Notepad', 'Gedit'],
        correctAnswer: 'Vim',
      },
      {
        type: 'cbt',
        question: 'What does the command "traceroute" (or "tracert") display?',
        options: ['The series of routers/hops a packet traverses to reach a destination', 'The CPU utilization history', 'The list of installed software', 'The Wi-Fi password in plaintext'],
        correctAnswer: 'The series of routers/hops a packet traverses to reach a destination',
      },
      {
        type: 'cbt',
        question: 'In a virtualized security sandbox lab, what software component isolates the guest operating system from host hardware?',
        options: ['Hypervisor', 'Compiler', 'BIOS Battery', 'Sound Driver'],
        correctAnswer: 'Hypervisor',
      },
      {
        type: 'cbt',
        question: 'What is a Live USB distribution like Kali Linux commonly used for in cyber security labs?',
        options: ['Booting a portable environment for penetration testing and forensics without altering the host hard drive', 'Speeding up computer gaming', 'Installing office spreadsheets', 'Formatting external hard drives automatically'],
        correctAnswer: 'Booting a portable environment for penetration testing and forensics without altering the host hard drive',
      },
    ],
  },

  // 3. CYB 102: Fundamentals of Computing & Cyber Ethics
  {
    code: 'CYB 102',
    title: 'Fundamentals of Computing & Cyber Ethics',
    level: 100,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'What does Cyber Ethics study?',
        options: ['The moral, legal, and social issues involving cyber technology and user behavior', 'The physical assembly of server chassis', 'The mathematical design of microprocessors', 'The speed optimization of graphics cards'],
        correctAnswer: 'The moral, legal, and social issues involving cyber technology and user behavior',
      },
      {
        type: 'cbt',
        question: 'What is a White Hat Hacker?',
        options: ['An ethical security professional who probes systems for vulnerabilities with prior authorization', 'A malicious attacker stealing credit cards', 'An amateur downloading hacking scripts without understanding', 'A state-sponsored spy'],
        correctAnswer: 'An ethical security professional who probes systems for vulnerabilities with prior authorization',
      },
      {
        type: 'cbt',
        question: 'What Nigerian legislation provides the legal framework for the prohibition and prevention of cybercrimes?',
        options: ['Cybercrimes (Prohibition, Prevention, etc.) Act 2015', 'Companies and Allied Matters Act', 'Evidence Act 2011', 'Criminal Code Act 1916'],
        correctAnswer: 'Cybercrimes (Prohibition, Prevention, etc.) Act 2015',
      },
      {
        type: 'cbt',
        question: 'What is Plagiarism in computing and academic research?',
        options: ['Using someone else code, writing, or ideas without proper attribution', 'Installing open-source software with permission', 'Pair programming with a classmate', 'Borrowing a book from the library'],
        correctAnswer: 'Using someone else code, writing, or ideas without proper attribution',
      },
      {
        type: 'cbt',
        question: 'What is a Non-Disclosure Agreement (NDA)?',
        options: ['A legally binding contract where parties agree not to disclose confidential information shared with them', 'A license for downloading video games', 'A network routing handshake protocol', 'A firewall rule specification'],
        correctAnswer: 'A legally binding contract where parties agree not to disclose confidential information shared with them',
      },
      {
        type: 'cbt',
        question: 'Which term describes malicious activity targeting individuals online through repeated harassment, threats, or intimidation?',
        options: ['Cyberbullying / Cyberharassment', 'Spamming', 'Phishing', 'Data Mining'],
        correctAnswer: 'Cyberbullying / Cyberharassment',
      },
      {
        type: 'cbt',
        question: 'What ethical principle requires obtaining clear user permission before collecting, processing, or storing personal data?',
        options: ['Informed Consent', 'Copyright Infringement', 'Right to Exploit', 'Fair Use'],
        correctAnswer: 'Informed Consent',
      },
      {
        type: 'cbt',
        question: 'What is Intellectual Property (IP) in the software industry?',
        options: ['Creations of the mind such as software source code, algorithms, and designs protected by law', 'Physical computer servers and switches', 'A public IP address leased from an ISP', 'Computer memory and cache storage'],
        correctAnswer: 'Creations of the mind such as software source code, algorithms, and designs protected by law',
      },
      {
        type: 'cbt',
        question: 'What is a "Grey Hat" hacker?',
        options: ['A hacker who may violate laws or ethical standards without malicious intent, often disclosing flaws to vendors', 'A purely benevolent authorized auditor', 'A cybercriminal engaged in ransomware extortion', 'A novice computer user'],
        correctAnswer: 'A hacker who may violate laws or ethical standards without malicious intent, often disclosing flaws to vendors',
      },
      {
        type: 'cbt',
        question: 'What international framework protects individuals personal data and privacy in digital spaces (pioneered in the EU)?',
        options: ['General Data Protection Regulation (GDPR)', 'HIPAA', 'PCI-DSS', 'SOX'],
        correctAnswer: 'General Data Protection Regulation (GDPR)',
      },
    ],
  },
  // Shared courses CSC 101, MTH 101, PHY 101, CHM 101, GST 111, LIB 101, CSC 102, MTH 102, PHY 102, CHM 102, GST 121
  { code: 'CSC 101', title: 'Introduction to Computer Science', level: 100, semester: 'harmattan', questions: [] },
  { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
  { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
  { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
  { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
  { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
  { code: 'CSC 102', title: 'Introduction to Problem Solving', level: 100, semester: 'rain', questions: [] },
  { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
  { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
  { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
  { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },
];

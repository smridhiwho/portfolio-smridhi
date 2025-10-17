import React, { useState, useEffect, useRef } from 'react';
import { X, Github, Linkedin, Mail, ExternalLink, Award, Briefcase, Code, Brain } from 'lucide-react';

const NeuralPortfolio = () => {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const nodesRef = useRef([]);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  const portfolioNodes = [
    {
      id: 'profile',
      x: 0.5, y: 0.15,
      label: 'Profile',
      type: 'center',
      connections: ['experience', 'research', 'projects'], 
      color: '#60a5fa',
      size: 32,
      content: {
        title: 'Full Stack Developer | AI Engineer',
        description: 'Building secure, large-scale AI applications with a product mindset',
        details: [
          '👩🏻‍💻 Full-stack developer specializing in enterprise-scale AI integrations',
          '🔒 Focus on secure AI systems with guardrails and evaluation frameworks',
          '🧠 Research-driven approach to building scalable architectures',
          '⚙️ Strong foundation in data structures & algorithms for optimal system design',
          '📊 Product mindset: end-to-end ownership from concept to production',
          '🏆 Published researcher (6 papers) with production engineering experience'
        ]
      }
    },
    {
      id: 'experience',
      x: 0.25, y: 0.32,
      label: 'Experience',
      type: 'work',
      color: '#34d399',
      size: 22,
      content: {
        title: 'Professional Experience',
        description: '2+ years across enterprise tech and ML research',
        details: [
          '💼 Technology Analyst @ Citibank (Jul 2024 - Present)',
          '📲 Product Analyst @ VibeSquad (Apr 2024 - July 2024)',
          '🔬 ML Research @ AI Institute SC, USA (Jan - Jul 2024)',
          '📊 ML Research @ IGDTUW, Delhi (Mar 2022 - Jul 2024)',
          'Spanning enterprise systems, startups, AI/ML research, and full-stack development'
        ]
      }
    },
    {
      id: 'citi',
      x: 0.15, y: 0.48,
      label: 'Citibank',
      type: 'work',
      color: '#34d399',
      size: 20,
      content: {
        title: 'Technology Analyst @ Citibank (Jul 2024 - Present)',
        description: 'Enterprise AI systems, microservices, and full-stack development',
        details: [
          '🏆 Citi RedCarpet Award recipient for contribution to technology & innovation',
          '⚡ Reduced ClientSim UI latency by 25% (worked full stack on React, Python & Java)',
          '👥 Led end-to-end feature delivery with design reviews & sprint planning',
          '🎓 Mentored 3 interns from the Singapore team',
          '🔧 Built scalable microservices (in FastAPI and Springboot respectively) with ETL pipelines',
          '📊 Cut manual triage time by 40% through automation'
        ]
      }
    },
    {
      id: 'ai-search',
      x: 0.05, y: 0.64,
      label: 'AI Search Engine',
      type: 'project',
      color: '#f59e0b',
      size: 17,
      content: {
        title: 'Enterprise AI Search Engine (MCP Server)',
        description: 'Internal search platform serving 2,500+ daily users',
        details: [
          '☕ Built Java-based MCP server architecture',
          '🔗 Integrated 5+ enterprise data sources',
          '👥 Powers internal tool access for all Citi employees',
          '📊 2,500+ daily active users',
          '🎯 Enables seamless discovery of internal research data for analysts'
        ]
      }
    },
    {
      id: 'fixai',
      x: 0.25, y: 0.64,
      label: 'FIXAI Platform',
      type: 'project',
      color: '#f59e0b',
      size: 17,
      content: {
        title: 'FIXAI - AI-Powered Trading Messages',
        description: 'Intelligent FIX message generation for traders',
        details: [
          '🤖 FastAPI application analyzing client trading behavior',
          '📈 Generates customized FIX messages based on patterns',
          '🛡️ Guardrails & evaluation frameworks for safety',
          '🔄 LangGraph agentic framework for orchestration',
          '☁️ End-to-end RAG pipeline from AWS S3 log containers',
          '⚡ Cut manual triage time by 40%',
          '📊 PostgreSQL + SQL for large-scale data ingestion'
        ]
      }
    },
    {
      id: 'research',
      x: 0.75, y: 0.32,
      label: 'Research',
      type: 'work',
      link: 'https://scholar.google.com/citations?user=ExpdUrQAAAAJ&hl=en&oi=sra',
      color: '#34d399',
      size: 22,
      content: {
        title: 'Machine Learning Research',
        description: 'Healthcare AI and cognitive modeling',
        details: [
          '📝 6 peer-reviewed papers published in international venues',
          '🔬 Research Intern (Genai) @ AI Institute of South Carolina (UoSC) under Prof. Amit Sheth.',
          '🏥 Research Intern @ IGDTUW for Computer-aided medical diagnosis',
          '🧠 developed novel Deep learning algorithms for cancer-imaging and neuroimaging analysis',
          '🌍 Google Scholar: scholar.google.com/citations?user=ExpdUrQAAAAJ'
        ]
      }
    },
    {
      id: 'research',
      x: 0.7, y: 0.48,
      label: 'AI Institute SC',
      type: 'work',
      link: 'https://scholar.google.com/citations?user=ExpdUrQAAAAJ&hl=en&oi=sra',
      color: '#34d399',
      size: 18,
      content: {
        title: 'AI Institute of South Carolina (Jan - Jul 2024)',
        description: 'ML Research Intern - Cognitive Modeling',
        details: [
          '🧠 Engineered scalable ML pipelines for neuroimaging datasets',
          '📊 Cognitive modeling research with large-scale brain data',
          '🎓 Was offered to avail the fully funded Clerks Memorial Scholarship'
        ]
      }
    },
    {
      id: 'research',
      x: 0.85, y: 0.48,
      label: 'IGDTUW Research',
      type: 'work',
      link: 'https://scholar.google.com/citations?user=ExpdUrQAAAAJ&hl=en&oi=sra',
      color: '#34d399',
      size: 18,
      content: {
        title: 'IGDTUW Research (Mar 2022 - Jul 2024)',
        description: 'ML Research Intern - Healthcare AI',
        details: [
          '📝 Published 6 papers in international conferences/journals',
          '🏥 Developed Deep learning algorithms & transformer techniques for computer-aided diagnosis',
          '🔬 Worked extensively on curating datasets, and building novel, high accuracy (>95%) classification models for medical image analysis',
          '📊 2+ years of continuous research tenure',
          '🏆 Recieved the Research Excellence Award from the Education Minister of Delhi with an INR 50K grant'
        ]
      }
    },
    {
      id: 'projects',
      x: 0.5, y: 0.48,
      label: 'Projects',
      type: 'project',
      color: '#f59e0b',
      size: 20,
      content: {
        title: 'Personal Projects',
        description: 'End-to-end system implementations',
        details: [
          'Real-time streaming architectures',
          'Production ML deployments',
          'Full-stack applications with AI',
          'Demonstrating system ownership'
        ]
      }
    },
    {
      id: 'anomaly',
      x: 0.5, y: 0.64,
      label: 'Financial Anomaly Detection',
      type: 'personal-project',
      link: 'https://github.com/smridhiwho/financial-anomaly-detection',
      color: '#f59e0b',
      size: 17,
      content: {
        title: 'Real-Time Financial Anomaly Detection (2025)',
        description: 'End-to-end streaming ML pipeline',
        details: [
          '⚡ Apache Kafka + PostgreSQL streaming architecture',
          '🤖 Isolation Forest anomaly detection (FastAPI)',
          '🚨 Real-time P&L fluctuation risk flagging',
          '📊 AI-generated daily anomaly summaries (VertexAI)',
          '💰 Simulates real-time financial transactions',
          '🎯 Demonstrates full system ownership end-to-end'
        ]
      }
    },
    {
      id: 'skills',
      x: 0.5, y: 0.78,
      label: 'Skills',
      type: 'skill',
      color: '#a78bfa',
      size: 20,
      content: {
        title: 'Technical Expertise',
        description: 'Full-stack development + AI/ML engineering',
        details: [
          '💻 Languages: Java, Python, JavaScript, SQL',
          '🤖 AI/ML: PyTorch, Transformers, LangChain, RAG, Finetuning',
          '🔧 Backend: Spring Boot, FastAPI, Microservices, REST APIs',
          '⚛️ Frontend: React, JavaScript, Figma, UI/UX',
          '☁️ Systems: Kafka, PostgreSQL, MongoDB, Redis, AWS (S3, SageMaker)',
          '📊 Tools: Git, Maven, ETL Pipelines, Data Warehousing',
          '🛡️ AI Security, Guardrails, A/B Testing, NLP'
        ]
      }
    },
    {
      id: 'achievements',
      x: 0.75, y: 0.78,
      label: 'Achievements',
      type: 'achievement',
      color: '#ec4899',
      size: 18,
      content: {
        title: 'Recognition & Leadership',
        description: 'Awards and community impact',
        details: [
          '🏆 Citi RedCarpet Award - Technology & Innovation',
          '🎓 Research Excellence Award by Delhi Education Minister (INR 50K)',
          '🥇 Top 15 out of 3000+ teams in Mercedes-Benz TechSign Challenge (India)',
          '👨‍🏫 Mentor, Intel AI4Youth building Projects showcased to President of India',
          '💼 Technical Head, IEEE IGDTUW (2022-2023)',
          '🎤 Led 5+ large-scale technical events',
          '🎯 Mentored 50+ students in technical leadership'
        ]
      }
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    nodesRef.current = portfolioNodes.map(node => ({
      ...node,
      screenX: canvas.width * node.x,
      screenY: canvas.height * node.y,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      targetX: canvas.width * node.x,
      targetY: canvas.height * node.y
    }));

    particlesRef.current = [];

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;

      nodes.forEach((node, i) => {
  if (node.connections) {
    node.connections.forEach(targetId => {
      const targetNode = nodes.find(n => n.id === targetId);
      if (targetNode) {
        ctx.strokeStyle = `rgba(96, 165, 250, 0.6)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(node.screenX, node.screenY);
        ctx.lineTo(targetNode.screenX, targetNode.screenY);
        ctx.stroke();
      }
    });
  }
  
  nodes.forEach((otherNode, j) => {
    if (i >= j) return;
    
    const dx = otherNode.screenX - node.screenX;
    const dy = otherNode.screenY - node.screenY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 300) {
      const alpha = 1 - distance / 300;
      ctx.strokeStyle = `rgba(100, 150, 255, ${alpha * 0.3})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(node.screenX, node.screenY);
      ctx.lineTo(otherNode.screenX, otherNode.screenY);
      ctx.stroke();
    }
  });
});

      nodes.forEach(node => {
        node.screenX += node.vx;
        node.screenY += node.vy;

        node.screenX += (node.targetX - node.screenX) * 0.02;
        node.screenY += (node.targetY - node.screenY) * 0.02;

        if (node.screenX < 50 || node.screenX > canvas.width - 50) node.vx *= -1;
        if (node.screenY < 50 || node.screenY > canvas.height - 50) node.vy *= -1;
      });

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life -= 0.01;
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.life > 0) {
          ctx.fillStyle = `rgba(100, 200, 255, ${particle.life})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }
        return false;
      });

      if (Math.random() < 0.05) {
        const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
        const toNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (fromNode !== toNode) {
          const angle = Math.atan2(toNode.screenY - fromNode.screenY, toNode.screenX - fromNode.screenX);
          particlesRef.current.push({
            x: fromNode.screenX,
            y: fromNode.screenY,
            vx: Math.cos(angle) * 2,
            vy: Math.sin(angle) * 2,
            life: 1
          });
        }
      }

      nodes.forEach(node => {
        const gradient = ctx.createRadialGradient(node.screenX, node.screenY, 0, node.screenX, node.screenY, node.size);
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, node.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.font = 'bold 12px system-ui';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        const label = node.label;
        const labelWidth = ctx.measureText(label).width;
        const padding = 4;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(
          node.screenX - labelWidth / 2 - padding,
          node.screenY + node.size + 5,
          labelWidth + padding * 2,
          16
        );

        ctx.fillStyle = '#e0e0e0';
        ctx.fillText(label, node.screenX, node.screenY + node.size + 17);

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [mousePos]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = nodesRef.current.find(node => {
      const dx = x - node.screenX;
      const dy = y - node.screenY;
      return Math.sqrt(dx * dx + dy * dy) < node.size;
    });

    if (clicked) {
      setSelectedNode(clicked);
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        particlesRef.current.push({
          x: clicked.screenX,
          y: clicked.screenY,
          vx: Math.cos(angle) * 3,
          vy: Math.sin(angle) * 3,
          life: 1
        });
      }
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'work': return <Briefcase className="w-5 h-5" />;
      case 'project': return <Code className="w-5 h-5" />;
      case 'skill': return <Brain className="w-5 h-5" />;
      case 'achievement': return <Award className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 cursor-pointer"
      />

      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1"> Smridhi's Neural Portfolio</h1>
            <p className="text-gray-400 text-xs md:text-sm">Click any node to explore my journey! </p>
          </div>
          <div className="flex gap-3 md:gap-4">
            <a 
              href="https://github.com/smridhiwho" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Github className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </a>
            <a 
              href="https://in.linkedin.com/in/smridhi-gupta-74337a219" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </a>
            <a 
              href="mailto:smridhiguptaa@gmail.com"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-black/80 backdrop-blur-sm rounded-lg p-3 md:p-4 z-10 border border-white/10 max-w-[calc(100vw-2rem)] md:max-w-none">
        <div className="text-xs text-gray-400 mb-2 font-semibold">NODE TYPES</div>
        <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-400"></div>
            <span className="text-gray-300">Profile</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400"></div>
            <span className="text-gray-300">Work Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400"></div>
            <span className="text-gray-300">Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-purple-400"></div>
            <span className="text-gray-300">Skills</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-pink-400"></div>
            <span className="text-gray-300">Achievements</span>
          </div>
        </div>
      </div>

      {selectedNode && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] md:w-full max-w-2xl z-20 p-2 md:p-4 max-h-[80vh] overflow-y-auto">
          <div className="bg-black/95 backdrop-blur-lg rounded-xl md:rounded-2xl border-2 shadow-2xl overflow-hidden" style={{ borderColor: selectedNode.color }}>
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="p-2 md:p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: `${selectedNode.color}20`, color: selectedNode.color }}>
                    {getTypeIcon(selectedNode.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg md:text-2xl font-bold text-white break-words">{selectedNode.content.title}</h2>
                    <p className="text-gray-400 text-xs md:text-sm mt-1">{selectedNode.content.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 ml-2"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-2">
                {selectedNode.content.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: selectedNode.color }}></div>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed break-words">{detail}</p>
                  </div>
                ))}
              </div>

              {(selectedNode.type === 'work' || selectedNode.type === 'personal-project') && selectedNode.link && (
                <a 
                  href={selectedNode.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 md:mt-4 w-full py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all text-sm md:text-base"
                >
                  {selectedNode.type === 'work' && selectedNode.id === 'research' ? 'View Google Scholar Profile' : 'View on GitHub'}
                  <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* {!selectedNode && (
        // <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 px-4">
        //   <div className="bg-black/60 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/20">
        //     <p className="text-white text-xs md:text-sm font-medium">
        //       ✨ Click any node to explore my journey
        //     </p>
        //   </div>
        // </div>
      )} */}
    </div>
  );
};

export default NeuralPortfolio;
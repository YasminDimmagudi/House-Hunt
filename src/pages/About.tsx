
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About HouseHunt
          </h1>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <p className="text-lg text-slate-300 leading-relaxed">
              HouseHunt is your trusted partner in finding the perfect rental property. We connect renters with quality homes and reliable landlords, making the rental process seamless and transparent. Our platform offers comprehensive property listings, advanced search filters, and direct communication tools to help you find your ideal home quickly and efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

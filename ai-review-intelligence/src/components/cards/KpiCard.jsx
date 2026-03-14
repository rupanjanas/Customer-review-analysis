const KpiCard = ({title,value}) => {

return(

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<p className="text-gray-400 text-sm mb-2">
{title}
</p>

<h2 className="text-2xl font-bold text-green-400">
{value}
</h2>

</div>

)

}

export default KpiCard
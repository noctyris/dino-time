export default function TableRow({data, nom}: {data: string, nom: string}) {
  return data && (
    <tr>
      <th className="text-left pr-4 text-gray-500">{nom}</th>
      <td>{data}</td>
    </tr>
  )
}

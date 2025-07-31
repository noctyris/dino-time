export default function TableRow({ data, nom }: { data: string; nom: string }) {
  return (
    data && (
      <tr>
        <th className="text-left pr-4 text-gray-500 w-1/2">{nom}</th>
        <td className="w-1/2">{data}</td>
      </tr>
    )
  );
}

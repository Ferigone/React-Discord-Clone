import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaDotCircle } from "react-icons/fa";

const columns = [
  { name: "Role", uid: "role" },
  { name: "Color", uid: "color" },
  { name: "Assigned Users", uid: "users" },
  { name: "Akcje", uid: "actions" },
];

const users = [
  {
    id: 1,
    role: "Technical Lead",
    color: "#FFC107",
    users: 4,
  },
  {
    id: 2,
    role: "Technical Lead",
    color: "#FFC107",
    users: 4,
  },
  {
    id: 3,
    role: "Technical Lead",
    color: "#FFC107",
    users: 4,
  },
  {
    id: 4,
    role: "Technical Lead",
    color: "#FFC107",
    users: 4,
  },
  {
    id: 5,
    role: "Technical Lead",
    color: "#FFC107",
    users: 4,
  },
];

export default function App() {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "color":
        return (
          <>
            <Chip variant="dot" startContent={<FaDotCircle size={18} color={cellValue} />}>{cellValue}</Chip>
          </>
        );
      case "users":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize flex flex-row items-center gap-2 pl-4">
              <IoMdPerson />
              {cellValue}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <FaTrash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

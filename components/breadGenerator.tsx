import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Fragment, Key } from "react";
import Link from "next/link";

export default function BreadGenerator(props: { data: {name: string, id: string }[] }) {
  props.data.unshift({name: "All", id: ""})
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {props.data.length > 2 ? (
            <>
              <BreadcrumbItem>
                  <BreadcrumbLink href={`/forum/${props.data[0].id}`}>
                    {props.data[0].name}
                  </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <BreadcrumbEllipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {props.data.slice(1, props.data.length - 1).map((el) => {
                      return (
                        <DropdownMenuItem key={el.id as Key}>
                          <BreadcrumbLink href={el.id}>
                            {el.name}
                          </BreadcrumbLink>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/forum/${props.data[props.data.length - 1].id}`}
                >
                  {props.data[props.data.length - 1].name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            </>
          ) : (
            props.data.map((el) => (
              <Fragment key={el.id as Key}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/forum/${el.id}`}>
                    {el.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              </Fragment>
            ))
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}

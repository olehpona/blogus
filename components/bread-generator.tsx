import { Slash } from "lucide-react";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Key } from "react";

export default function BreadGenerator(props: {data: string[]}){
    return (
      <>
        <Breadcrumb>
          <BreadcrumbList>
            {props.data.length > 4 ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    {props.data[0]}
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
                          <DropdownMenuItem key={el as Key}>
                            <BreadcrumbLink >
                              {el}
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
                  >
                    {props.data[props.data.length - 1]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              </>
            ) : (
              props.data.map((el) => (
                <>
                  <BreadcrumbItem key={el as Key}>
                    <BreadcrumbLink >{el}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator key={el as Key}>
                    <Slash  />
                  </BreadcrumbSeparator>
                </>
              ))
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </>
    );
}
import React from "react";

type item = {
  title: string;
  children: React.ReactNode;
};
// React.Children.map te permite iterar sobre children de manera segura, independientemente de si children es un solo elemento, una lista de elementos, o null. La cual recibe dos argumentos: los children y una función que se aplicará a cada child.
const ItemSubmenu = ({ title, children }: item) => {
  return (
    <section className="py-2 sm:py-3 px-3 sm:px-4 border-b border-white/10 last:border-b-0">
      <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base tracking-wide text-white">{title}</h3>
      <div className="space-y-0.5">
        {React.Children.map(children, (child, index) => {
          // Check if child is a valid React element
          if (React.isValidElement(child)) {
            // Check if the element is of type <p>
            if (child.type === "p") {
              // Return the <p> element with Tailwind classes
              return (
                <p key={index} className="py-2 sm:py-2.5 px-2 sm:px-3 cursor-pointer rounded-md transition-all duration-150 text-xs sm:text-sm border-l-2 border-transparent hover:border-orange-400 hover:bg-white/10 text-gray-200 hover:text-white">
                  {child.props.children}
                </p>
              );
            } else {
              // Wrap non-<p> elements in a <p>
              return <p key={index} className="py-2 sm:py-2.5 px-2 sm:px-3 cursor-pointer rounded-md transition-all duration-150 text-xs sm:text-sm border-l-2 border-transparent hover:border-orange-400 hover:bg-white/10 text-gray-200 hover:text-white">{child}</p>;
            }
          }
          // If not a valid element, return null or handle accordingly
          return null;
        })}
      </div>
    </section>
  );
};

export default ItemSubmenu;

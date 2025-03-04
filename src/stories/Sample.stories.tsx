import { Meta, StoryObj } from "@storybook/react";
import { ReactNode, TextareaHTMLAttributes } from "react";
import { Waiter } from "../index";

const SimpleExampleWaiter = Waiter<{
  getUserResult: { name: string },
  getTimestampResult: { timestamp: string },
  mustFailResult: boolean,
}>;

const meta = {
  title: "Example",
  component: SimpleExampleWaiter,
} satisfies Meta<typeof SimpleExampleWaiter>;

export default meta;

export const SimpleExample: StoryObj<typeof meta> = {
  args: {
    orders: {
      getUserResult: getUser(500),
      getTimestampResult: getTimestamp(750),
      mustFailResult: mustFail(1000),
    },
    sideshow: (<div>Loading...</div>),
    serve: (values) => (
      <VStack>
        <Textarea rows={6}>
          {JSON.stringify(values.getUserResult, null, 2)}
        </Textarea>

        <Textarea rows={6}>
          {JSON.stringify(values.getTimestampResult, null, 2)}
        </Textarea>

        <Textarea rows={7}>
          {JSON.stringify(values.mustFailResult, null, 2)}
        </Textarea>
      </VStack>
    ),
  },
};

async function getUser(delay: number): Promise<{ name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
      });
    }, delay);
  });
}

async function getTimestamp(delay: number): Promise<{ timestamp: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        timestamp: Date.now().toFixed(0),
      });
    }, delay);
  });
}

async function mustFail(delay: number): Promise<boolean> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Fail"));
    }, delay);
  });
}

function VStack({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1em",
    }}>
      {children}
    </div>
  );
};

function Textarea({
  children,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  children: ReactNode;
}) {
  return (
    <textarea
      {...rest}
      style={{
        padding: "1em",
        boxSizing: "border-box",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "0.5em",
      }}>
      {children}
    </textarea>
  );
}

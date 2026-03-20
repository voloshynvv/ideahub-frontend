import { useState } from "react";
import Markdown from "react-markdown";

import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export interface PostEditorValues {
  title: string;
  content: string;
  tag: string;
}

export type ResetCallback = () => void;

interface PostEditorProps {
  isLoading?: boolean;
  initialValues?: Partial<PostEditorValues>;
  onSubmit: (values: PostEditorValues, resetCallback?: ResetCallback) => void;
}

export const PostEditor = ({
  isLoading,
  initialValues,
  onSubmit,
}: PostEditorProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [tag, setTag] = useState(initialValues?.tag ?? "");

  const isEditMode = !!initialValues;
  const buttonText = isEditMode ? "Update" : "Publish";

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!title || !content) {
      return;
    }

    const values = {
      title,
      content,
      tag,
    };

    onSubmit(values, () => {
      setTitle("");
      setContent("");
      setTag("");
    });
  };

  return (
    <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
      <div className="mb-10">
        <label className="sr-only" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          className="mb-4 block w-full text-2xl focus-visible:outline-none"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="sr-only" htmlFor="tag">
          Tag
        </label>
        <input
          id="tag"
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="block w-full text-sm focus-visible:outline-none"
          placeholder="Tag"
        />
      </div>

      <Tabs className="flex flex-1 flex-col gap-4">
        <TabsList variant="line">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent className="flex flex-col" value="write">
          <label className="sr-only" htmlFor="content">
            Post content
          </label>
          <textarea
            id="content"
            placeholder="Write your thoughts here..."
            className="block flex-1 resize-none text-sm leading-[24px] focus-visible:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </TabsContent>
        <TabsContent value="preview">
          <div className="prose prose-sm">
            <Markdown>{content}</Markdown>
          </div>
        </TabsContent>
      </Tabs>

      <Button
        disabled={!title || !content || isLoading}
        loading={isLoading}
        type="submit"
      >
        {buttonText}
      </Button>
    </form>
  );
};

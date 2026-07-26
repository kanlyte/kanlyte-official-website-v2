"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { Underline } from "@tiptap/extension-underline";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { Link as TiptapLink } from "@tiptap/extension-link";
import { Image as TiptapImage } from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ImageUpload } from "@/components/admin/shared/image-upload";
import { CreateNewsPostSchema } from "@/content-manager/dtos/news-post.dto";
import type { CreateNewsPostInput } from "@/content-manager/dtos/news-post.dto";
import { useCreateNewsPost, useUpdateNewsPost } from "@/content-manager/hooks/useNewsPosts";
import { format } from "date-fns";
import NextLink from "next/link";
import {
  ArrowLeft, Save,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, ListTodo,
  Quote, Code, Code2,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Link as LinkIcon, ImageIcon,
  Subscript as SubscriptIcon, Superscript as SuperscriptIcon,
  Table as TableIcon, Minus, RemoveFormatting,
  Undo, Redo,
} from "lucide-react";

const lowlight = createLowlight();
lowlight.register("javascript", js);
lowlight.register("typescript", ts);
lowlight.register("python", python);

function toDateInputValue(value: unknown) {
  if (!value) return format(new Date(), "yyyy-MM-dd");
  return format(new Date(value as string | Date), "yyyy-MM-dd");
}

interface NewsPostEditorProps {
  mode: "create" | "edit";
  postId?: string;
  defaultValues?: Partial<CreateNewsPostInput>;
}

function TB({ onClick, active, title, disabled, children }: {
  onClick: () => void; active?: boolean; title: string; disabled?: boolean; children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`p-1.5 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
              active ? "bg-[#6EBE45] text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function NewsPostEditor({ mode, postId, defaultValues }: NewsPostEditorProps) {
  const router = useRouter();
  const { mutate: create, isPending: creating } = useCreateNewsPost();
  const { mutate: update, isPending: updating } = useUpdateNewsPost();
  const isPending = creating || updating;

  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [pendingImageUrl, setPendingImageUrl] = useState("");
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [pendingLinkUrl, setPendingLinkUrl] = useState("");

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isDirty } } = useForm<CreateNewsPostInput>({
    resolver: zodResolver(CreateNewsPostSchema),
    defaultValues: { title: "", excerpt: "", content: "", image: "", publishedAt: new Date(), order: 0, isActive: true, ...defaultValues },
  });

  const isActive = watch("isActive");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({ placeholder: "Write your article here..." }),
      CharacterCount,
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TiptapLink.configure({ openOnClick: false, HTMLAttributes: { class: "text-[#6EBE45] underline cursor-pointer" } }),
      TiptapImage.configure({ HTMLAttributes: { class: "rounded-lg max-w-full my-2" } }),
      TextStyle,
      Color,
      Subscript,
      Superscript,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      TaskList,
      TaskItem.configure({ nested: true }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: defaultValues?.content ?? "",
    onUpdate: ({ editor }) => setValue("content", editor.getHTML(), { shouldDirty: true }),
    editorProps: {
      attributes: { class: "prose prose-sm max-w-none min-h-[500px] px-5 py-4 focus:outline-none text-sm leading-relaxed" },
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({ title: "", excerpt: "", content: "", image: "", publishedAt: new Date(), order: 0, isActive: true, ...defaultValues });
      if (editor && defaultValues.content) editor.commands.setContent(defaultValues.content);
    }
  }, [defaultValues?.title]);

  const openLinkDialog = useCallback(() => {
    const existing = editor?.getAttributes("link").href ?? "";
    setPendingLinkUrl(existing);
    setLinkDialogOpen(true);
  }, [editor]);

  function confirmLink() {
    if (!pendingLinkUrl) {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor?.chain().focus().extendMarkRange("link").setLink({ href: pendingLinkUrl }).run();
    }
    setLinkDialogOpen(false);
    setPendingLinkUrl("");
  }

  function confirmImage() {
    if (pendingImageUrl) {
      editor?.chain().focus().setImage({ src: pendingImageUrl }).run();
    }
    setImageDialogOpen(false);
    setPendingImageUrl("");
  }

  function onSubmit(data: CreateNewsPostInput) {
    if (mode === "edit" && postId) {
      update({ id: postId, data }, { onSuccess: () => router.push("/admin/news-posts") });
    } else {
      create(data, { onSuccess: () => router.push("/admin/news-posts") });
    }
  }

  const wordCount = editor?.storage.characterCount.words() ?? 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-background">

      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-background border-b px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <NextLink href="/admin/news-posts">
            <Button type="button" variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" /> News Posts
            </Button>
          </NextLink>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm text-muted-foreground">{mode === "edit" ? "Editing post" : "New post"}</span>
          {isDirty && <Badge variant="outline" className="text-xs text-amber-600 border-amber-300 bg-amber-50">Unsaved</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-2">
            <Switch checked={isActive} onCheckedChange={(v) => setValue("isActive", v)} id="isActive" />
            <Label htmlFor="isActive" className="cursor-pointer">
              <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "bg-[#6EBE45] text-white text-xs" : "text-xs"}>
                {isActive ? "Active" : "Draft"}
              </Badge>
            </Label>
          </div>
          <Button type="submit" size="sm" className="gap-1.5 bg-[#6EBE45] hover:bg-[#5aA835] text-white" disabled={isPending}>
            <Save className="w-4 h-4" />
            {isPending ? "Saving..." : mode === "edit" ? "Save Changes" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

        {/* Main Editor */}
        <div className="space-y-5">
          <div>
            <input
              placeholder="Post title..."
              className="w-full text-3xl font-bold border-none outline-none bg-transparent placeholder:text-muted-foreground/40 leading-tight"
              {...register("title")}
            />
            {errors.title && <p className="text-destructive text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Excerpt</Label>
            <Textarea placeholder="A short summary shown on news cards..." className="resize-none h-14 text-sm border-dashed" {...register("excerpt")} />
          </div>

          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Content</Label>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border border-b-0 rounded-t-md bg-muted/40">
              <TB title="Undo (Ctrl+Z)" onClick={() => editor?.chain().focus().undo().run()} disabled={!editor?.can().undo()}><Undo className="w-3.5 h-3.5" /></TB>
              <TB title="Redo (Ctrl+Y)" onClick={() => editor?.chain().focus().redo().run()} disabled={!editor?.can().redo()}><Redo className="w-3.5 h-3.5" /></TB>
              <Separator orientation="vertical" className="h-5 mx-1" />
              <TB title="Bold (Ctrl+B)" active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()}><Bold className="w-3.5 h-3.5" /></TB>
              <TB title="Italic (Ctrl+I)" active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()}><Italic className="w-3.5 h-3.5" /></TB>
              <TB title="Underline (Ctrl+U)" active={editor?.isActive("underline")} onClick={() => editor?.chain().focus().toggleUnderline().run()}><UnderlineIcon className="w-3.5 h-3.5" /></TB>
              <TB title="Strikethrough" active={editor?.isActive("strike")} onClick={() => editor?.chain().focus().toggleStrike().run()}><Strikethrough className="w-3.5 h-3.5" /></TB>
              <TB title="Highlight" active={editor?.isActive("highlight")} onClick={() => editor?.chain().focus().toggleHighlight().run()}><Highlighter className="w-3.5 h-3.5" /></TB>
              <TB title="Inline code" active={editor?.isActive("code")} onClick={() => editor?.chain().focus().toggleCode().run()}><Code className="w-3.5 h-3.5" /></TB>
              <TB title="Subscript" active={editor?.isActive("subscript")} onClick={() => editor?.chain().focus().toggleSubscript().run()}><SubscriptIcon className="w-3.5 h-3.5" /></TB>
              <TB title="Superscript" active={editor?.isActive("superscript")} onClick={() => editor?.chain().focus().toggleSuperscript().run()}><SuperscriptIcon className="w-3.5 h-3.5" /></TB>
              <Separator orientation="vertical" className="h-5 mx-1" />
              <TB title="Heading 1" active={editor?.isActive("heading", { level: 1 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 className="w-3.5 h-3.5" /></TB>
              <TB title="Heading 2" active={editor?.isActive("heading", { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="w-3.5 h-3.5" /></TB>
              <TB title="Heading 3" active={editor?.isActive("heading", { level: 3 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="w-3.5 h-3.5" /></TB>
              <Separator orientation="vertical" className="h-5 mx-1" />
              <TB title="Bullet list" active={editor?.isActive("bulletList")} onClick={() => editor?.chain().focus().toggleBulletList().run()}><List className="w-3.5 h-3.5" /></TB>
              <TB title="Ordered list" active={editor?.isActive("orderedList")} onClick={() => editor?.chain().focus().toggleOrderedList().run()}><ListOrdered className="w-3.5 h-3.5" /></TB>
              <TB title="Task list" active={editor?.isActive("taskList")} onClick={() => editor?.chain().focus().toggleTaskList().run()}><ListTodo className="w-3.5 h-3.5" /></TB>
              <Separator orientation="vertical" className="h-5 mx-1" />
              <TB title="Align left" active={editor?.isActive({ textAlign: "left" })} onClick={() => editor?.chain().focus().setTextAlign("left").run()}><AlignLeft className="w-3.5 h-3.5" /></TB>
              <TB title="Align center" active={editor?.isActive({ textAlign: "center" })} onClick={() => editor?.chain().focus().setTextAlign("center").run()}><AlignCenter className="w-3.5 h-3.5" /></TB>
              <TB title="Align right" active={editor?.isActive({ textAlign: "right" })} onClick={() => editor?.chain().focus().setTextAlign("right").run()}><AlignRight className="w-3.5 h-3.5" /></TB>
              <TB title="Justify" active={editor?.isActive({ textAlign: "justify" })} onClick={() => editor?.chain().focus().setTextAlign("justify").run()}><AlignJustify className="w-3.5 h-3.5" /></TB>
              <Separator orientation="vertical" className="h-5 mx-1" />
              <TB title="Blockquote" active={editor?.isActive("blockquote")} onClick={() => editor?.chain().focus().toggleBlockquote().run()}><Quote className="w-3.5 h-3.5" /></TB>
              <TB title="Code block" active={editor?.isActive("codeBlock")} onClick={() => editor?.chain().focus().toggleCodeBlock().run()}><Code2 className="w-3.5 h-3.5" /></TB>
              <TB title="Divider" onClick={() => editor?.chain().focus().setHorizontalRule().run()}><Minus className="w-3.5 h-3.5" /></TB>
              <TB title="Insert table" onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><TableIcon className="w-3.5 h-3.5" /></TB>
              <Separator orientation="vertical" className="h-5 mx-1" />
              <TB title="Insert / edit link" active={editor?.isActive("link")} onClick={openLinkDialog}><LinkIcon className="w-3.5 h-3.5" /></TB>
              <TB title="Insert image" onClick={() => { setPendingImageUrl(""); setImageDialogOpen(true); }}><ImageIcon className="w-3.5 h-3.5" /></TB>
              <Separator orientation="vertical" className="h-5 mx-1" />
              <TB title="Clear formatting" onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}><RemoveFormatting className="w-3.5 h-3.5" /></TB>
              <div className="ml-auto text-xs text-muted-foreground pr-1 tabular-nums">
                {wordCount} words · ~{readingTime}m read
              </div>
            </div>

            <div className="border rounded-b-md bg-white overflow-auto">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="space-y-2 p-4 border rounded-lg bg-muted/20">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover Image</Label>
            <ImageUpload label="" value={watch("image")} onChange={(url) => setValue("image", url, { shouldValidate: true })} />
          </div>

          <div className="space-y-3 p-4 border rounded-lg bg-muted/20">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Post Settings</Label>
            <div className="space-y-1">
              <Label htmlFor="publishedAt" className="text-xs">Published Date</Label>
              <Input id="publishedAt" type="date" className="h-8 text-sm"
                value={toDateInputValue(watch("publishedAt"))}
                onChange={(e) => setValue("publishedAt", e.target.value ? new Date(e.target.value) : new Date())}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="order" className="text-xs">Display Order</Label>
              <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
            </div>
          </div>

          {wordCount > 0 && (
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center bg-muted/20 border rounded-lg p-3">
                <div className="text-xl font-bold text-[#6EBE45]">{wordCount}</div>
                <div className="text-xs text-muted-foreground">Words</div>
              </div>
              <div className="text-center bg-muted/20 border rounded-lg p-3">
                <div className="text-xl font-bold text-[#6EBE45]">{readingTime}m</div>
                <div className="text-xs text-muted-foreground">Read time</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Insert Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="sm:max-w-[420px] p-0 gap-0">
          <DialogHeader className="px-5 pt-5 pb-3 border-b">
            <DialogTitle className="text-sm font-semibold">Insert Image</DialogTitle>
          </DialogHeader>
          <div className="px-5 py-4">
            <ImageUpload
              label="Upload or select an image"
              value={pendingImageUrl}
              onChange={(url) => setPendingImageUrl(url)}
            />
          </div>
          <DialogFooter className="px-5 py-3 border-t">
            <Button type="button" variant="outline" size="sm" onClick={() => setImageDialogOpen(false)}>Cancel</Button>
            <Button type="button" size="sm" className="bg-[#6EBE45] hover:bg-[#5aA835] text-white" onClick={confirmImage} disabled={!pendingImageUrl}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Insert Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="sm:max-w-[380px] p-0 gap-0">
          <DialogHeader className="px-5 pt-5 pb-3 border-b">
            <DialogTitle className="text-sm font-semibold">Insert Link</DialogTitle>
          </DialogHeader>
          <div className="px-5 py-4 space-y-2">
            <Label className="text-xs">URL</Label>
            <Input
              placeholder="https://example.com"
              value={pendingLinkUrl}
              onChange={(e) => setPendingLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && confirmLink()}
              className="h-8 text-sm"
              autoFocus
            />
            <p className="text-xs text-muted-foreground">Leave empty to remove the link.</p>
          </div>
          <DialogFooter className="px-5 py-3 border-t">
            <Button type="button" variant="outline" size="sm" onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
            <Button type="button" size="sm" className="bg-[#6EBE45] hover:bg-[#5aA835] text-white" onClick={confirmLink}>
              {pendingLinkUrl ? "Insert" : "Remove Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style>{`
        .tiptap p.is-editor-empty:first-child::before { content: attr(data-placeholder); float: left; color: #adb5bd; pointer-events: none; height: 0; }
        .tiptap h1 { font-size: 1.75rem; font-weight: 700; margin: 1rem 0 0.5rem; line-height: 1.2; }
        .tiptap h2 { font-size: 1.4rem; font-weight: 700; margin: 1rem 0 0.5rem; line-height: 1.3; }
        .tiptap h3 { font-size: 1.15rem; font-weight: 600; margin: 0.75rem 0 0.4rem; }
        .tiptap ul { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
        .tiptap ol { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
        .tiptap ul[data-type="taskList"] { list-style: none; padding-left: 0.5rem; }
        .tiptap ul[data-type="taskList"] li { display: flex; align-items: flex-start; gap: 0.5rem; }
        .tiptap ul[data-type="taskList"] li > label { margin-top: 2px; }
        .tiptap blockquote { border-left: 3px solid #6EBE45; padding-left: 1rem; color: #6b7280; margin: 0.75rem 0; font-style: italic; }
        .tiptap hr { border: none; border-top: 1px solid #e5e7eb; margin: 1.25rem 0; }
        .tiptap code { background: #f3f4f6; padding: 0.15rem 0.35rem; border-radius: 4px; font-size: 0.85em; font-family: monospace; }
        .tiptap pre { background: #1e1e2e; color: #cdd6f4; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 0.75rem 0; }
        .tiptap pre code { background: none; padding: 0; font-size: 0.85rem; }
        .tiptap mark { background: #fef08a; padding: 0.1rem 0.2rem; border-radius: 2px; }
        .tiptap a { color: #6EBE45; text-decoration: underline; }
        .tiptap table { border-collapse: collapse; width: 100%; margin: 0.75rem 0; }
        .tiptap table td, .tiptap table th { border: 1px solid #e5e7eb; padding: 0.5rem 0.75rem; min-width: 80px; }
        .tiptap table th { background: #f9fafb; font-weight: 600; }
        .tiptap p { margin: 0.4rem 0; }
      `}</style>
    </form>
  );
}

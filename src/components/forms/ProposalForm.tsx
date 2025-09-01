import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Proposal } from '@/hooks/useProposals';

interface ProposalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  initialData?: Partial<Proposal>;
  isEditing?: boolean;
}

export const ProposalForm: React.FC<ProposalFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEditing = false
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      budget_min: 0,
      budget_max: 0,
      status: 'draft',
      skills: [],
      win_probability: 0,
      notes: ''
    }
  });

  const handleFormSubmit = async (data: any) => {
    try {
      // Convert skills string to array
      if (typeof data.skills === 'string') {
        data.skills = data.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      
      await onSubmit(data);
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Proposal' : 'Create New Proposal'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              placeholder="Proposal title"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Proposal description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget_min">Min Budget ($)</Label>
              <Input
                id="budget_min"
                type="number"
                {...register('budget_min', { valueAsNumber: true })}
                placeholder="1000"
              />
            </div>
            <div>
              <Label htmlFor="budget_max">Max Budget ($)</Label>
              <Input
                id="budget_max"
                type="number"
                {...register('budget_max', { valueAsNumber: true })}
                placeholder="5000"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={initialData?.status || 'draft'} onValueChange={(value) => setValue('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              {...register('skills')}
              placeholder="React, TypeScript, Node.js"
            />
          </div>

          <div>
            <Label htmlFor="win_probability">Win Probability (%)</Label>
            <Input
              id="win_probability"
              type="number"
              min="0"
              max="100"
              {...register('win_probability', { valueAsNumber: true })}
              placeholder="75"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Additional notes"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};